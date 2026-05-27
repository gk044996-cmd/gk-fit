import Workout from '../models/Workout.js';
import Food from '../models/Food.js';

const workoutsData = [
  {
    title: "Beginner's Full Body Starter",
    category: "Beginner",
    difficulty: "Easy",
    duration: 30,
    caloriesBurned: 220,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=60",
    description: "A perfect routine for gym beginners designed to build coordination, joint strength, and initial fitness capacity.",
    exercises: [
      {
        name: "Bodyweight Squats",
        targetMuscle: "Quads & Glutes",
        instructions: [
          "Stand with feet shoulder-width apart, chest upright.",
          "Lower your hips back and down as if sitting in a chair.",
          "Keep knees behind toes and drive through your heels to return to standing."
        ],
        commonMistakes: [
          "Letting knees cave inwards.",
          "Lifting heels off the ground.",
          "Rounding the lower back."
        ],
        benefits: [
          "Strengthens lower body joints.",
          "Improves mobility and balance.",
          "Builds foundational quad strength."
        ],
        sets: 3,
        reps: "12-15 reps",
        durationSeconds: 45
      },
      {
        name: "Incline Push-Ups",
        targetMuscle: "Chest & Triceps",
        instructions: [
          "Place hands slightly wider than shoulder-width on an elevated bench or wall.",
          "Maintain a straight line from head to heels.",
          "Lower your chest toward the platform and push back up smoothly."
        ],
        commonMistakes: [
          "Sagging hips or arching lower back.",
          "Flaring elbows out to 90 degrees."
        ],
        benefits: [
          "Develops upper body pushing power.",
          "Safer entry-level chest exercise compared to flat ground pushups."
        ],
        sets: 3,
        reps: "10-12 reps",
        durationSeconds: 40
      },
      {
        name: "Plank Hold",
        targetMuscle: "Core & Abs",
        instructions: [
          "Place forearms on the ground with elbows aligned below shoulders.",
          "Keep body in a straight line, squeezing your core and glutes.",
          "Hold the position while breathing steadily."
        ],
        commonMistakes: [
          "Letting the hips sag down.",
          "Lifting hips too high.",
          "Holding your breath."
        ],
        benefits: [
          "Builds isometric core strength.",
          "Stabilizes spine and protects lower back."
        ],
        sets: 3,
        reps: "30s Hold",
        durationSeconds: 30
      }
    ]
  },
  {
    title: "High Intensity Fat Burner",
    category: "Fat Loss",
    difficulty: "Hard",
    duration: 40,
    caloriesBurned: 480,
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&auto=format&fit=crop&q=60",
    description: "A fast-paced cardio and conditioning workout aimed at spiking the heart rate and maximizing post-exercise oxygen consumption.",
    exercises: [
      {
        name: "Jumping Jacks",
        targetMuscle: "Full Body & Cardio",
        instructions: [
          "Stand with feet together and arms at your sides.",
          "Jump feet outward while raising arms above your head.",
          "Jump back to the starting position immediately."
        ],
        commonMistakes: [
          "Landing too hard on flat feet.",
          "Flapping arms lazily."
        ],
        benefits: [
          "Increases cardiovascular endurance.",
          "Warms up all major muscle groups."
        ],
        sets: 4,
        reps: "45 seconds",
        durationSeconds: 45
      },
      {
        name: "Burpees",
        targetMuscle: "Full Body & Cardio",
        instructions: [
          "Start in a standing position, squat down, and place hands on the floor.",
          "Jump feet back into a plank, drop chest to floor, then push back up.",
          "Jump feet back toward hands, and explosively jump straight up into the air."
        ],
        commonMistakes: [
          "Letting hips drop when jumping back.",
          "Landing with straight knees."
        ],
        benefits: [
          "Excellent calorie burner.",
          "Develops explosive power and speed."
        ],
        sets: 3,
        reps: "10-12 reps",
        durationSeconds: 50
      },
      {
        name: "Mountain Climbers",
        targetMuscle: "Core & Cardio",
        instructions: [
          "Start in a pushup position.",
          "Drive one knee toward your chest, then switch legs quickly in a running motion.",
          "Keep hips level and head in line with spine."
        ],
        commonMistakes: [
          "Bouncing hips up and down.",
          "Not bringing knees all the way in."
        ],
        benefits: [
          "Spikes heart rate.",
          "Tones lower abs and shoulders."
        ],
        sets: 3,
        reps: "40 seconds",
        durationSeconds: 40
      }
    ]
  },
  {
    title: "Hypertrophy Upper Body Blast",
    category: "Muscle Gain",
    difficulty: "Hard",
    duration: 50,
    caloriesBurned: 420,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=60",
    description: "Focused resistance training targeting the chest, back, and shoulders for maximum muscle growth and definition.",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        targetMuscle: "Chest & Shoulders",
        instructions: [
          "Lie flat on a bench holding dumbbells at chest height.",
          "Press weights straight up until arms are extended, squeezing your chest.",
          "Lower weights slowly until elbows are slightly below bench level."
        ],
        commonMistakes: [
          "Banging dumbbells together at the top.",
          "Arching the lower back excessively off the bench."
        ],
        benefits: [
          "Builds chest size and thickness.",
          "Improves unilateral pushing balance."
        ],
        sets: 4,
        reps: "8-10 reps",
        durationSeconds: 60
      },
      {
        name: "Dumbbell Bent-Over Row",
        targetMuscle: "Lats & Upper Back",
        instructions: [
          "Hinge forward at the hips, keeping back flat and knees slightly bent.",
          "Hold dumbbells straight down, then pull elbows back towards your hips.",
          "Squeeze shoulder blades together and lower weights under control."
        ],
        commonMistakes: [
          "Rounding the spine.",
          "Using momentum to swing the weights up."
        ],
        benefits: [
          "Builds back width and thickness.",
          "Improves posture and core stability."
        ],
        sets: 4,
        reps: "10-12 reps",
        durationSeconds: 60
      },
      {
        name: "Dumbbell Shoulder Press",
        targetMuscle: "Shoulders (Deltoids)",
        instructions: [
          "Sit or stand upright holding dumbbells at ear level with palms forward.",
          "Press the weights upward in an arc until arms are extended.",
          "Lower back to ear level slowly."
        ],
        commonMistakes: [
          "Leaning back excessively to press.",
          "Locking out elbows forcefully."
        ],
        benefits: [
          "Builds shoulder width and upper body strength.",
          "Increases overhead stability."
        ],
        sets: 3,
        reps: "10-12 reps",
        durationSeconds: 50
      }
    ]
  },
  {
    title: "Bodyweight Home Burn",
    category: "Home Workout",
    difficulty: "Medium",
    duration: 25,
    caloriesBurned: 260,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=60",
    description: "No weights, no gym, no excuses. A full-body conditioning routine perfect for living rooms or hotel rooms.",
    exercises: [
      {
        name: "Alternating Lunges",
        targetMuscle: "Glutes & Quads",
        instructions: [
          "Stand tall, step forward with one foot, and lower hips.",
          "Bend both knees to 90 degrees, keeping front knee over ankle.",
          "Push off front foot to return to start, and alternate legs."
        ],
        commonMistakes: [
          "Front knee tracking past toes.",
          "Torso leaning forward too much."
        ],
        benefits: [
          "Improves single-leg strength and stability.",
          "Stretches tight hip flexors."
        ],
        sets: 3,
        reps: "10 per leg",
        durationSeconds: 45
      },
      {
        name: "Standard Push-Ups",
        targetMuscle: "Chest & Core",
        instructions: [
          "Place hands flat, slightly wider than shoulder-width.",
          "Lower chest close to floor, keeping body in a straight line.",
          "Push back up to starting position, locking out elbows soft."
        ],
        commonMistakes: [
          "Elbows flared out 90 degrees (tuck them at 45).",
          "Hips drooping or head hanging."
        ],
        benefits: [
          "Excellent horizontal push builder.",
          "Engages full abdominal and core wall."
        ],
        sets: 3,
        reps: "12-15 reps",
        durationSeconds: 45
      },
      {
        name: "Bicycle Crunches",
        targetMuscle: "Abs & Obliques",
        instructions: [
          "Lie on back, hands behind head, knees bent at 90 degrees.",
          "Raise shoulder blades, bring right elbow toward left knee while straightening right leg.",
          "Switch sides dynamically in a cycling cadence."
        ],
        commonMistakes: [
          "Pulling on the neck with hands.",
          "Moving legs too quickly without control."
        ],
        benefits: [
          "Targets rectus abdominis and obliques simultaneously.",
          "Improves coordination."
        ],
        sets: 3,
        reps: "20 reps (10 each side)",
        durationSeconds: 30
      }
    ]
  }
];

const foodsData = [
  // Meats & Eggs
  {
    name: "Grilled Chicken Breast",
    calories: 165,
    protein: 31.0,
    carbs: 0.0,
    fats: 3.6,
    fiber: 0.0,
    sugar: 0.0,
    sodium: 74,
    defaultUnit: "g",
    category: "Meats"
  },
  {
    name: "Whole Egg (Large)",
    calories: 143,
    protein: 12.6,
    carbs: 0.7,
    fats: 9.5,
    fiber: 0.0,
    sugar: 0.3,
    sodium: 142,
    defaultUnit: "piece",
    weightPerPiece: 50,
    category: "Meats & Eggs"
  },
  // Indian Staples
  {
    name: "Idli",
    calories: 156, // per 100g (approx 78 kcal per 50g piece)
    protein: 4.0,  // per 100g
    carbs: 32.0,   // per 100g
    fats: 0.4,     // per 100g
    fiber: 2.0,    // per 100g
    sugar: 0.0,
    sodium: 320,   // per 100g
    defaultUnit: "piece",
    weightPerPiece: 50,
    category: "Indian Foods"
  },
  {
    name: "Plain Dosa",
    calories: 208, // per 100g (approx 166 kcal per 80g piece)
    protein: 4.7,  // per 100g
    carbs: 40.6,   // per 100g
    fats: 3.9,     // per 100g
    fiber: 1.2,    // per 100g
    sugar: 0.2,
    sodium: 188,   // per 100g
    defaultUnit: "piece",
    weightPerPiece: 80,
    category: "Indian Foods"
  },
  {
    name: "Low Fat Paneer",
    calories: 265,
    protein: 18.3,
    carbs: 1.2,
    fats: 20.8,
    fiber: 0.0,
    sugar: 0.0,
    sodium: 18,
    defaultUnit: "g",
    category: "Dairy & Paneer"
  },
  {
    name: "Whole Wheat Roti",
    calories: 300, // per 100g (approx 120 kcal per 40g piece)
    protein: 8.7,  // per 100g
    carbs: 60.0,   // per 100g
    fats: 2.0,     // per 100g
    fiber: 7.5,    // per 100g
    sugar: 0.1,
    sodium: 200,   // per 100g
    defaultUnit: "piece",
    weightPerPiece: 40,
    category: "Indian Foods"
  },
  // Grains & Gym Foods
  {
    name: "White Rice (Cooked)",
    calories: 130,
    protein: 2.7,
    carbs: 28.0,
    fats: 0.3,
    fiber: 0.4,
    sugar: 0.1,
    sodium: 1,
    defaultUnit: "g",
    weightPerCup: 195,
    category: "Grains"
  },
  {
    name: "Brown Rice (Cooked)",
    calories: 111,
    protein: 2.6,
    carbs: 23.0,
    fats: 0.9,
    fiber: 1.8,
    sugar: 0.1,
    sodium: 5,
    defaultUnit: "g",
    weightPerCup: 195,
    category: "Grains"
  },
  {
    name: "Rolled Oats (Raw)",
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fats: 6.9,
    fiber: 10.6,
    sugar: 0.0,
    sodium: 2,
    defaultUnit: "g",
    weightPerCup: 90,
    category: "Grains"
  },
  {
    name: "Smooth Peanut Butter",
    calories: 588,
    protein: 25.0,
    carbs: 20.0,
    fats: 50.0,
    fiber: 6.0,
    sugar: 9.0,
    sodium: 17,
    defaultUnit: "g",
    category: "Gym Foods"
  },
  // Dairy
  {
    name: "Whole Milk",
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fats: 3.3,
    fiber: 0.0,
    sugar: 5.1,
    sodium: 44,
    defaultUnit: "ml",
    weightPerCup: 240,
    category: "Dairy"
  },
  {
    name: "Plain Greek Yogurt",
    calories: 59,
    protein: 10.0,
    carbs: 3.6,
    fats: 0.4,
    fiber: 0.0,
    sugar: 3.2,
    sodium: 36,
    defaultUnit: "g",
    weightPerCup: 245,
    category: "Dairy"
  },
  // Fruits & Veg
  {
    name: "Banana",
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fats: 0.3,
    fiber: 2.6,
    sugar: 12.2,
    sodium: 1,
    defaultUnit: "piece",
    weightPerPiece: 120,
    category: "Fruits"
  },
  {
    name: "Apple (Medium)",
    calories: 52,
    protein: 0.3,
    carbs: 13.8,
    fats: 0.2,
    fiber: 2.4,
    sugar: 10.4,
    sodium: 1,
    defaultUnit: "piece",
    weightPerPiece: 180,
    category: "Fruits"
  },
  {
    name: "Broccoli (Raw)",
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fats: 0.4,
    fiber: 2.6,
    sugar: 1.7,
    sodium: 33,
    defaultUnit: "g",
    weightPerCup: 91,
    category: "Vegetables"
  }
];

const seedAllData = async () => {
  try {
    const workoutCount = await Workout.countDocuments();
    if (workoutCount === 0) {
      console.log('Seeding Workouts...');
      await Workout.insertMany(workoutsData);
      console.log('Workouts Seeded Successfully!');
    }

    const foodCount = await Food.countDocuments();
    if (foodCount === 0) {
      console.log('Seeding Foods...');
      await Food.insertMany(foodsData);
      console.log('Foods Seeded Successfully!');
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

export { seedAllData };
