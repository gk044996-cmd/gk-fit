import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import * as foodService from '../services/foodService.js';
import * as nutritionService from '../services/nutritionService.js';
import Card from '../components/Common/Card.jsx';
import Input from '../components/Common/Input.jsx';
import Button from '../components/Common/Button.jsx';
import LoadingSpinner from '../components/Common/LoadingSpinner.jsx';
import { 
  FiSearch, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiChevronLeft, 
  FiChevronRight, 
  FiCalendar, 
  FiX, 
  FiActivity, 
  FiInfo 
} from 'react-icons/fi';

const Diet = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  // Date management
  const getLocalTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [date, setDate] = useState(getLocalTodayDateString());
  const [intake, setIntake] = useState(null);
  const [loading, setLoading] = useState(true);

  // Search autocomplete state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchContainerRef = useRef(null);

  // Add/Edit Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(100);
  const [modalUnit, setModalUnit] = useState('g');
  const [modalMealType, setModalMealType] = useState('breakfast');
  const [editingItem, setEditingItem] = useState(null); // stores the item object if editing

  // Dynamic goals based on user fitness goal
  const getTargets = (goal) => {
    switch (goal) {
      case 'Fat Loss':
        return { calories: 1700, protein: 150, carbs: 160, fats: 50, fiber: 25, sugar: 40, sodium: 2300 };
      case 'Muscle Gain':
        return { calories: 2700, protein: 170, carbs: 340, fats: 80, fiber: 30, sugar: 60, sodium: 2300 };
      case 'Get Fit':
      case 'Maintenance':
      default:
        return { calories: 2000, protein: 130, carbs: 230, fats: 60, fiber: 25, sugar: 50, sodium: 2300 };
    }
  };

  const targets = getTargets(user?.fitnessGoal);

  // Fetch daily logs
  const fetchDailyIntake = async (dateStr) => {
    setLoading(true);
    try {
      const data = await nutritionService.getDailyIntake(dateStr);
      setIntake(data);
    } catch (error) {
      console.error('Failed to load daily intake:', error);
      showToast('Could not load nutrition logs', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyIntake(date);
  }, [date]);

  // Click outside search suggestions closes dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search food items
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length >= 2) {
      setSearching(true);
      setShowSearchDropdown(true);
      try {
        const results = await foodService.getFoods(query);
        setSearchResults(results);
      } catch (err) {
        console.error('Error fetching foods:', err);
      } finally {
        setSearching(false);
      }
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  };

  // Date toggles
  const handlePrevDate = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setDate(`${year}-${month}-${day}`);
  };

  const handleNextDate = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setDate(`${year}-${month}-${day}`);
  };

  // Open modal to add food
  const handleSelectFood = (food, defaultMeal = 'breakfast') => {
    setSelectedFood(food);
    setModalQuantity(food.defaultUnit === 'piece' ? 1 : 100);
    setModalUnit(food.defaultUnit || 'g');
    setModalMealType(defaultMeal);
    setEditingItem(null);
    setShowModal(true);
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  // Open modal to edit logged item
  const handleOpenEdit = (item, mealType) => {
    // We need to fetch original food or map from log details
    const pseudoFood = {
      _id: item.foodId,
      name: item.name,
      // Work backwards to find standard 100g base values
      // baseVal = loggedVal / (weight / 100)
      // For simple mapping, we store raw ratios
      calories: Math.round((item.calories / (item.quantity || 1)) * 100),
      protein: Math.round((item.protein / (item.quantity || 1)) * 100),
      carbs: Math.round((item.carbs / (item.quantity || 1)) * 100),
      fats: Math.round((item.fats / (item.quantity || 1)) * 100),
      fiber: Math.round((item.fiber / (item.quantity || 1)) * 100),
      sugar: Math.round((item.sugar / (item.quantity || 1)) * 100),
      sodium: Math.round((item.sodium / (item.quantity || 1)) * 100),
      defaultUnit: item.unit
    };
    
    // Attempt to locate real food details in seeded/fetched lists to get weightPerPiece etc.
    foodService.getFoods(item.name).then(res => {
      const match = res.find(f => f._id === item.foodId || f.name === item.name);
      if (match) {
        setSelectedFood(match);
        setModalUnit(item.unit);
      } else {
        setSelectedFood(pseudoFood);
        setModalUnit(item.unit);
      }
    }).catch(() => {
      setSelectedFood(pseudoFood);
      setModalUnit(item.unit);
    });

    setModalQuantity(item.quantity);
    setModalMealType(mealType);
    setEditingItem(item);
    setShowModal(true);
  };

  // Delete food item log
  const handleDeleteItem = async (itemId, mealType) => {
    if (!window.confirm('Remove this food item from your log?')) return;

    try {
      const updated = await nutritionService.removeFoodIntake(itemId, { date, mealType });
      setIntake(updated);
      showToast('Food log removed successfully');
    } catch (error) {
      console.error(error);
      showToast('Failed to delete food log', 'error');
    }
  };

  // Submit add/edit
  const handleSaveFood = async () => {
    if (!modalQuantity || Number(modalQuantity) <= 0) {
      showToast('Please enter a valid quantity', 'warning');
      return;
    }

    try {
      if (editingItem) {
        // Editing existing log
        const updated = await nutritionService.editFoodIntake(editingItem._id, {
          date,
          mealType: modalMealType,
          quantity: Number(modalQuantity)
        });
        setIntake(updated);
        showToast('Food entry updated successfully');
      } else {
        // Adding new log
        const updated = await nutritionService.addFoodIntake({
          date,
          mealType: modalMealType,
          foodId: selectedFood._id,
          quantity: Number(modalQuantity),
          unit: modalUnit
        });
        setIntake(updated);
        showToast('Food added to log');
      }
      setShowModal(false);
    } catch (error) {
      console.error(error);
      showToast('Failed to save food log', 'error');
    }
  };

  // Nutrition helper sums
  const getNutritionTotals = () => {
    const sums = { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0, sodium: 0 };
    if (!intake || !intake.meals) return sums;

    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];
    mealTypes.forEach((meal) => {
      const items = intake.meals[meal] || [];
      items.forEach((item) => {
        sums.calories += item.calories || 0;
        sums.protein += item.protein || 0;
        sums.carbs += item.carbs || 0;
        sums.fats += item.fats || 0;
        sums.fiber += item.fiber || 0;
        sums.sugar += item.sugar || 0;
        sums.sodium += item.sodium || 0;
      });
    });

    // Round values
    return {
      calories: Math.round(sums.calories),
      protein: Math.round(sums.protein * 10) / 10,
      carbs: Math.round(sums.carbs * 10) / 10,
      fats: Math.round(sums.fats * 10) / 10,
      fiber: Math.round(sums.fiber * 10) / 10,
      sugar: Math.round(sums.sugar * 10) / 10,
      sodium: Math.round(sums.sodium)
    };
  };

  const totals = getNutritionTotals();
  const remainingCalories = targets.calories - totals.calories;

  // Live calculations in modal
  const getLivePreview = () => {
    if (!selectedFood) return null;
    let weight = Number(modalQuantity) || 0;

    if (modalUnit === 'piece') {
      weight = (Number(modalQuantity) || 0) * (selectedFood.weightPerPiece || 100);
    } else if (modalUnit === 'cup') {
      weight = (Number(modalQuantity) || 0) * (selectedFood.weightPerCup || 200);
    }

    const factor = weight / 100;

    return {
      calories: Math.round(selectedFood.calories * factor),
      protein: Math.round(selectedFood.protein * factor * 10) / 10,
      carbs: Math.round(selectedFood.carbs * factor * 10) / 10,
      fats: Math.round(selectedFood.fats * factor * 10) / 10,
      fiber: Math.round((selectedFood.fiber || 0) * factor * 10) / 10,
      sugar: Math.round((selectedFood.sugar || 0) * factor * 10) / 10,
      sodium: Math.round((selectedFood.sodium || 0) * factor)
    };
  };

  const livePreview = getLivePreview();

  // Circular gauge config
  const circleRadius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * circleRadius;
  const progressRatio = Math.min(1, totals.calories / targets.calories);
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="flex flex-col gap-6 pb-12 w-full text-left">
      {/* Page header and Date picker */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-white tracking-tight">Smart Calorie & Macro Tracker</h2>
          <p className="text-sm text-gray-400">Log your meals dynamically, monitor macros, and stay within budget.</p>
        </div>

        {/* Dynamic Date Selection Strip */}
        <div className="flex items-center gap-2 bg-[#12121a]/60 border border-white/[0.04] p-1.5 rounded-xl backdrop-blur-xl">
          <button 
            onClick={handlePrevDate} 
            className="p-2 rounded-lg hover:bg-white/[0.05] text-gray-400 hover:text-white transition-colors"
          >
            <FiChevronLeft className="text-lg" />
          </button>
          
          <div className="flex items-center gap-2 px-3 text-sm font-semibold text-white">
            <FiCalendar className="text-purple-400" />
            <span>{date === getLocalTodayDateString() ? 'Today' : date}</span>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="absolute opacity-0 w-8 h-8 cursor-pointer"
            />
          </div>

          <button 
            onClick={handleNextDate} 
            className="p-2 rounded-lg hover:bg-white/[0.05] text-gray-400 hover:text-white transition-colors"
          >
            <FiChevronRight className="text-lg" />
          </button>
        </div>
      </div>

      {/* Global Interactive Search */}
      <div ref={searchContainerRef} className="relative w-full z-20">
        <div className="relative flex items-center">
          <FiSearch className="absolute left-4 text-gray-400 text-lg pointer-events-none" />
          <input
            type="text"
            placeholder="Search foods to log (e.g. eggs, chicken, oats, idli, rice, paneer...)"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowSearchDropdown(true)}
            className="w-full bg-[#12121a]/60 border border-white/[0.06] rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all backdrop-blur-xl"
          />
          {searchQuery && (
            <button 
              onClick={() => { setSearchQuery(''); setSearchResults([]); setShowSearchDropdown(false); }}
              className="absolute right-4 text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/[0.04]"
            >
              <FiX />
            </button>
          )}
        </div>

        {/* Search Results Autocomplete Dropdown */}
        {showSearchDropdown && searchQuery.trim().length >= 2 && (
          <div className="absolute top-full left-0 w-full mt-2 bg-[#12121a] border border-white/[0.06] rounded-xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto backdrop-blur-2xl z-30">
            {searching ? (
              <div className="p-4 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" /> Searching database...
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-4 text-center text-xs text-gray-400">
                No foods matching "{searchQuery}" found. Try typing "egg", "chicken", "paneer", or "roti".
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-white/[0.04]">
                {searchResults.map((food) => (
                  <button
                    key={food._id}
                    onClick={() => handleSelectFood(food)}
                    className="flex justify-between items-center px-4 py-3 text-left w-full hover:bg-white/[0.02] transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {food.name}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {food.calories} kcal per 100{food.defaultUnit === 'ml' ? 'ml' : 'g'} • {food.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right text-xs">
                        <span className="text-orange-400 font-medium">P: {food.protein}g</span>
                        <span className="text-purple-400 font-medium ml-2.5">C: {food.carbs}g</span>
                        <span className="text-blue-400 font-medium ml-2.5">F: {food.fats}g</span>
                      </div>
                      <span className="p-1 rounded-lg bg-white/[0.04] text-gray-400 group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-colors">
                        <FiPlus />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="h-[40vh] flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          {/* Daily Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Calories circular gauge */}
            <Card className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 border border-white/[0.05]">
              <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r={circleRadius}
                    className="stroke-white/[0.04]"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r={circleRadius}
                    className="stroke-orange-500 transition-all duration-500 ease-out"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white">{totals.calories}</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Logged</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-center sm:text-left">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Calorie Balance</div>
                <div className="text-3xl font-black text-white">
                  {Math.abs(remainingCalories)}
                </div>
                <div className={`text-xs font-bold px-2 py-0.5 rounded-md inline-block max-w-max mx-auto sm:mx-0 ${
                  remainingCalories >= 0 
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}>
                  {remainingCalories >= 0 ? 'Calories Remaining' : 'Over Daily Budget'}
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Daily target: {targets.calories} kcal
                </div>
              </div>
            </Card>

            {/* Macro details progress sliders */}
            <Card className="flex flex-col justify-center gap-4.5 p-6 border border-white/[0.05]">
              <h3 className="text-xs font-bold text-gray-450 uppercase tracking-widest border-b border-white/[0.04] pb-2">
                Macro Breakdown
              </h3>
              
              {/* Protein slider */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white">Protein</span>
                  <span className="text-gray-400 font-medium">{totals.protein}g / {targets.protein}g</span>
                </div>
                <div className="w-full bg-white/[0.04] h-2.5 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${Math.min(100, (totals.protein / targets.protein) * 100)}%` }}
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>

              {/* Carbs slider */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white">Carbohydrates</span>
                  <span className="text-gray-400 font-medium">{totals.carbs}g / {targets.carbs}g</span>
                </div>
                <div className="w-full bg-white/[0.04] h-2.5 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${Math.min(100, (totals.carbs / targets.carbs) * 100)}%` }}
                    className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>

              {/* Fats slider */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white">Fats</span>
                  <span className="text-gray-400 font-medium">{totals.fats}g / {targets.fats}g</span>
                </div>
                <div className="w-full bg-white/[0.04] h-2.5 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${Math.min(100, (totals.fats / targets.fats) * 100)}%` }}
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            </Card>

            {/* Micro nutrient badges */}
            <Card className="flex flex-col justify-between gap-4 p-6 border border-white/[0.05]">
              <h3 className="text-xs font-bold text-gray-455 uppercase tracking-widest border-b border-white/[0.04] pb-2">
                Micronutrient Tracking
              </h3>
              
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] items-center text-center">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Fiber</span>
                  <span className="text-white text-base font-extrabold">{totals.fiber}g</span>
                  <span className="text-[9px] text-gray-500">Target: 25g+</span>
                </div>

                <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] items-center text-center">
                  <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">Sugar</span>
                  <span className="text-white text-base font-extrabold">{totals.sugar}g</span>
                  <span className="text-[9px] text-gray-500">Limit: &lt;50g</span>
                </div>

                <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] items-center text-center">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Sodium</span>
                  <span className="text-white text-sm font-extrabold truncate w-full" title={`${totals.sodium} mg`}>
                    {totals.sodium}mg
                  </span>
                  <span className="text-[9px] text-gray-500">Max: 2300mg</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Meals list (4 categories: breakfast, lunch, dinner, snacks) */}
          <div className="grid grid-cols-1 gap-6 mt-2">
            
            {['breakfast', 'lunch', 'dinner', 'snacks'].map((meal) => {
              const items = intake?.meals?.[meal] || [];
              const mealCalories = Math.round(items.reduce((sum, i) => sum + (i.calories || 0), 0));
              const mealProtein = Math.round(items.reduce((sum, i) => sum + (i.protein || 0), 0) * 10) / 10;
              const mealCarbs = Math.round(items.reduce((sum, i) => sum + (i.carbs || 0), 0) * 10) / 10;
              const mealFats = Math.round(items.reduce((sum, i) => sum + (i.fats || 0), 0) * 10) / 10;

              return (
                <Card key={meal} className="border border-white/[0.04] p-5 flex flex-col gap-4 overflow-hidden relative text-left">
                  {/* Meal Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.04] pb-3">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-base font-bold text-white uppercase tracking-wider">{meal}</h3>
                      <span className="text-xs text-gray-400 font-semibold">{mealCalories} kcal</span>
                    </div>

                    <div className="flex items-center gap-4">
                      {items.length > 0 && (
                        <div className="hidden sm:flex gap-3 text-[10px] text-gray-405 font-bold uppercase">
                          <span className="text-orange-400">P: {mealProtein}g</span>
                          <span className="text-purple-400">C: {mealCarbs}g</span>
                          <span className="text-blue-400">F: {mealFats}g</span>
                        </div>
                      )}
                      
                      <button 
                        onClick={() => {
                          setSelectedFood({
                            name: '',
                            calories: 0,
                            protein: 0,
                            carbs: 0,
                            fats: 0,
                            defaultUnit: 'g'
                          });
                          setModalQuantity(100);
                          setModalUnit('g');
                          setModalMealType(meal);
                          setEditingItem(null);
                          // Open modal and force search focus
                          showToast(`Select a food or type search term to log to ${meal}`, 'info');
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-bold bg-purple-500/10 hover:bg-purple-500/20 px-3 py-1.5 rounded-lg border border-purple-500/20 transition-all"
                      >
                        <FiPlus /> Add Food
                      </button>
                    </div>
                  </div>

                  {/* Logged foods rows */}
                  {items.length === 0 ? (
                    <div className="py-6 text-center text-xs text-gray-500 italic">
                      No foods logged for {meal} yet. Use search or quick add button.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3.5 divide-y divide-white/[0.03]">
                      {items.map((item, idx) => (
                        <div key={item._id || idx} className={`flex justify-between items-center ${idx > 0 ? 'pt-3.5' : ''}`}>
                          <div className="flex-1 min-w-0 pr-3 space-y-1">
                            <div className="text-sm font-bold text-white truncate" title={item.name}>{item.name}</div>
                            <div className="text-xs text-gray-400 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                              <span className="font-semibold text-gray-300">
                                {item.quantity} {item.unit}
                              </span>
                              <span className="text-gray-600">•</span>
                              <span className="text-orange-400 font-medium">P: {item.protein}g</span>
                              <span className="text-purple-400 font-medium">C: {item.carbs}g</span>
                              <span className="text-blue-400 font-medium">F: {item.fats}g</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-sm font-extrabold text-white">{Math.round(item.calories)} kcal</span>
                            
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleOpenEdit(item, meal)}
                                className="p-2 text-gray-400 hover:text-purple-400 rounded-lg hover:bg-white/[0.04] transition-colors"
                                title="Edit log"
                              >
                                <FiEdit className="text-sm" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item._id, meal)}
                                className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/[0.04] transition-colors"
                                title="Delete log"
                              >
                                <FiTrash2 className="text-sm" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* Food Log Add/Edit Modal */}
      {showModal && selectedFood && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f15] border border-white/[0.08] w-full max-w-md rounded-2xl p-6 shadow-2xl relative text-left">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/[0.04]"
            >
              <FiX className="text-lg" />
            </button>

            <div className="space-y-1.5 pb-4 border-b border-white/[0.04]">
              <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded uppercase border border-purple-500/15">
                {editingItem ? 'Edit Entry' : 'Log Food Details'}
              </span>
              <h3 className="text-lg font-black text-white pr-6 leading-tight">
                {selectedFood.name || 'Log Custom Food'}
              </h3>
            </div>

            <div className="space-y-5 py-4">
              {/* Inputs group */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-semibold">Quantity</label>
                  <input
                    type="number"
                    value={modalQuantity}
                    onChange={(e) => setModalQuantity(e.target.value)}
                    className="w-full bg-[#1b1b24] border border-white/[0.06] rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="Enter amount"
                    min="0"
                    step="any"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-semibold">Unit</label>
                  {editingItem ? (
                    // Read-only unit for edits
                    <div className="w-full bg-[#1b1b24]/40 border border-white/[0.03] text-gray-400 rounded-xl py-2.5 px-3.5 text-sm font-medium">
                      {modalUnit}
                    </div>
                  ) : (
                    <select
                      value={modalUnit}
                      onChange={(e) => setModalUnit(e.target.value)}
                      className="w-full bg-[#1b1b24] border border-white/[0.06] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="g">grams (g)</option>
                      {selectedFood.defaultUnit === 'ml' && <option value="ml">milliliters (ml)</option>}
                      {selectedFood.weightPerPiece && <option value="piece">pieces (ea)</option>}
                      {selectedFood.weightPerCup && <option value="cup">cups</option>}
                    </select>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold">Meal Type</label>
                <select
                  value={modalMealType}
                  onChange={(e) => setModalMealType(e.target.value)}
                  className="w-full bg-[#1b1b24] border border-white/[0.06] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-all cursor-pointer"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snacks">Snacks &amp; Shakes</option>
                </select>
              </div>

              {/* Dynamic Live Nutrients Preview */}
              {livePreview && (
                <div className="bg-[#12121a] rounded-xl border border-white/[0.04] p-4 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-gray-450 font-bold uppercase tracking-wider">Nutrition Preview</span>
                    <span className="text-lg font-black text-white">{livePreview.calories} kcal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 border-t border-white/[0.04] pt-3 text-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 font-semibold uppercase">Protein</span>
                      <span className="text-xs text-orange-400 font-bold">{livePreview.protein}g</span>
                    </div>
                    <div className="flex flex-col border-x border-white/[0.04]">
                      <span className="text-[10px] text-gray-500 font-semibold uppercase">Carbs</span>
                      <span className="text-xs text-purple-400 font-bold">{livePreview.carbs}g</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 font-semibold uppercase">Fats</span>
                      <span className="text-xs text-blue-400 font-bold">{livePreview.fats}g</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-end pt-2 border-t border-white/[0.04]">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <Button 
                onClick={handleSaveFood}
                className="px-6 py-2 text-xs font-bold"
              >
                {editingItem ? 'Save Updates' : 'Add to Log'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diet;
