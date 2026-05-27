import mongoose from 'mongoose';
import DailyIntake from '../models/DailyIntake.js';
import Food from '../models/Food.js';

// Helper to calculate nutrients based on food details, quantity, and unit
const calculateNutrients = (food, quantity, unit) => {
  let weight = quantity;
  
  if (unit === 'piece') {
    weight = quantity * (food.weightPerPiece || 100);
  } else if (unit === 'cup') {
    weight = quantity * (food.weightPerCup || 200);
  }
  
  // Base nutrients are per 100g/ml in the database
  const factor = weight / 100;
  
  return {
    calories: Math.round(food.calories * factor * 10) / 10,
    protein: Math.round(food.protein * factor * 10) / 10,
    carbs: Math.round(food.carbs * factor * 10) / 10,
    fats: Math.round(food.fats * factor * 10) / 10,
    fiber: Math.round((food.fiber || 0) * factor * 10) / 10,
    sugar: Math.round((food.sugar || 0) * factor * 10) / 10,
    sodium: Math.round((food.sodium || 0) * factor * 10) / 10
  };
};

// @desc    Get daily food intake logs & summary
// @route   GET /api/nutrition/daily
// @access  Private
const getDailyIntake = async (req, res) => {
  try {
    const { date } = req.query;
    const userId = req.user._id;

    if (!date) {
      return res.status(404).json({ message: 'Date parameter is required' });
    }

    let intake = await DailyIntake.findOne({ userId, date });

    if (!intake) {
      // Return a structured blank log so the frontend can bind easily without throwing errors
      return res.json({
        userId,
        date,
        meals: {
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: []
        }
      });
    }

    res.json(intake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add food item to daily intake log
// @route   POST /api/nutrition/add
// @access  Private
const addFoodIntake = async (req, res) => {
  try {
    const { date, mealType, foodId, quantity, unit } = req.body;
    const userId = req.user._id;

    if (!date || !mealType || !foodId || !quantity || !unit) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!['breakfast', 'lunch', 'dinner', 'snacks'].includes(mealType)) {
      return res.status(400).json({ message: 'Invalid meal type' });
    }

    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    const nutrients = calculateNutrients(food, Number(quantity), unit);

    const loggedFood = {
      _id: global.useFallbackDb ? Math.random().toString(36).substring(2, 11) : new mongoose.Types.ObjectId(),
      foodId: food._id,
      name: food.name,
      quantity: Number(quantity),
      unit,
      ...nutrients
    };

    let intake = await DailyIntake.findOne({ userId, date });

    if (!intake) {
      const initialMeals = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
      };
      initialMeals[mealType].push(loggedFood);

      intake = await DailyIntake.create({
        userId,
        date,
        meals: initialMeals
      });
    } else {
      const meals = {
        breakfast: intake.meals.breakfast || [],
        lunch: intake.meals.lunch || [],
        dinner: intake.meals.dinner || [],
        snacks: intake.meals.snacks || []
      };

      meals[mealType].push(loggedFood);

      intake = await DailyIntake.findOneAndUpdate(
        { userId, date },
        { meals },
        { new: true }
      );
    }

    res.status(201).json(intake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Edit quantity of logged food in daily intake log
// @route   PUT /api/nutrition/edit/:logId
// @access  Private
const editFoodIntake = async (req, res) => {
  try {
    const { logId } = req.params;
    const { date, mealType, quantity } = req.body;
    const userId = req.user._id;

    if (!date || !mealType || quantity === undefined) {
      return res.status(400).json({ message: 'Please provide date, mealType, and quantity' });
    }

    let intake = await DailyIntake.findOne({ userId, date });
    if (!intake) {
      return res.status(404).json({ message: 'Daily intake log not found' });
    }

    const meals = {
      breakfast: intake.meals.breakfast || [],
      lunch: intake.meals.lunch || [],
      dinner: intake.meals.dinner || [],
      snacks: intake.meals.snacks || []
    };

    const mealArray = meals[mealType];
    const foodIndex = mealArray.findIndex(item => item._id.toString() === logId);

    if (foodIndex === -1) {
      return res.status(404).json({ message: 'Logged food item not found in this meal' });
    }

    const loggedFood = mealArray[foodIndex];
    const food = await Food.findById(loggedFood.foodId);
    if (!food) {
      return res.status(404).json({ message: 'Original food item not found' });
    }

    const nutrients = calculateNutrients(food, Number(quantity), loggedFood.unit);

    mealArray[foodIndex] = {
      ...loggedFood,
      quantity: Number(quantity),
      ...nutrients
    };

    meals[mealType] = mealArray;

    const updatedIntake = await DailyIntake.findOneAndUpdate(
      { userId, date },
      { meals },
      { new: true }
    );

    res.json(updatedIntake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove food item from daily intake log
// @route   DELETE /api/nutrition/remove/:logId
// @access  Private
const removeFoodIntake = async (req, res) => {
  try {
    const { logId } = req.params;
    const { date, mealType } = req.query; // Support query string
    const userId = req.user._id;

    const finalDate = date || req.body.date;
    const finalMealType = mealType || req.body.mealType;

    if (!finalDate || !finalMealType) {
      return res.status(400).json({ message: 'Please provide date and mealType' });
    }

    let intake = await DailyIntake.findOne({ userId, date: finalDate });
    if (!intake) {
      return res.status(404).json({ message: 'Daily intake log not found' });
    }

    const meals = {
      breakfast: intake.meals.breakfast || [],
      lunch: intake.meals.lunch || [],
      dinner: intake.meals.dinner || [],
      snacks: intake.meals.snacks || []
    };

    const mealArray = meals[finalMealType];
    const updatedMealArray = mealArray.filter(item => item._id.toString() !== logId);

    meals[finalMealType] = updatedMealArray;

    const updatedIntake = await DailyIntake.findOneAndUpdate(
      { userId, date: finalDate },
      { meals },
      { new: true }
    );

    res.json(updatedIntake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getDailyIntake,
  addFoodIntake,
  editFoodIntake,
  removeFoodIntake
};
