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
  // BREAKFAST
  {
    name: "Idli",
    calories: 156,
    protein: 4.0,
    carbs: 32.0,
    fats: 0.4,
    fiber: 2.0,
    sugar: 0.0,
    sodium: 320,
    defaultUnit: "piece",
    weightPerPiece: 50,
    category: "breakfast"
  },
  {
    name: "Plain Dosa",
    calories: 208,
    protein: 4.7,
    carbs: 40.6,
    fats: 3.9,
    fiber: 1.2,
    sugar: 0.2,
    sodium: 188,
    defaultUnit: "piece",
    weightPerPiece: 80,
    category: "breakfast"
  },
  {
    name: "Masala Dosa",
    calories: 387,
    protein: 7.8,
    carbs: 54.2,
    fats: 14.5,
    fiber: 3.5,
    sugar: 0.5,
    sodium: 420,
    defaultUnit: "piece",
    weightPerPiece: 150,
    category: "breakfast"
  },
  {
    name: "Rava Dosa",
    calories: 245,
    protein: 5.2,
    carbs: 41.0,
    fats: 6.8,
    fiber: 1.8,
    sugar: 0.3,
    sodium: 310,
    defaultUnit: "piece",
    weightPerPiece: 100,
    category: "breakfast"
  },
  {
    name: "Pongal",
    calories: 350,
    protein: 8.5,
    carbs: 52.0,
    fats: 11.2,
    fiber: 4.2,
    sugar: 0.1,
    sodium: 380,
    defaultUnit: "cup",
    weightPerCup: 200,
    category: "breakfast"
  },
  {
    name: "Upma",
    calories: 230,
    protein: 5.0,
    carbs: 36.0,
    fats: 7.5,
    fiber: 2.8,
    sugar: 0.5,
    sodium: 290,
    defaultUnit: "cup",
    weightPerCup: 150,
    category: "breakfast"
  },
  {
    name: "Poha",
    calories: 270,
    protein: 4.2,
    carbs: 44.5,
    fats: 8.0,
    fiber: 2.5,
    sugar: 1.2,
    sodium: 280,
    defaultUnit: "cup",
    weightPerCup: 150,
    category: "breakfast"
  },
  {
    name: "Plain Paratha",
    calories: 260,
    protein: 4.8,
    carbs: 38.0,
    fats: 9.8,
    fiber: 3.2,
    sugar: 0.1,
    sodium: 190,
    defaultUnit: "piece",
    weightPerPiece: 80,
    category: "breakfast"
  },
  {
    name: "Aloo Paratha",
    calories: 310,
    protein: 5.8,
    carbs: 48.0,
    fats: 10.5,
    fiber: 4.5,
    sugar: 0.2,
    sodium: 280,
    defaultUnit: "piece",
    weightPerPiece: 100,
    category: "breakfast"
  },
  {
    name: "Chole Bhature",
    calories: 650,
    protein: 14.0,
    carbs: 82.0,
    fats: 30.0,
    fiber: 8.5,
    sugar: 1.5,
    sodium: 620,
    defaultUnit: "piece",
    weightPerPiece: 260,
    category: "breakfast"
  },
  {
    name: "Poori",
    calories: 120,
    protein: 2.1,
    carbs: 16.5,
    fats: 5.2,
    fiber: 1.1,
    sugar: 0.1,
    sodium: 110,
    defaultUnit: "piece",
    weightPerPiece: 40,
    category: "breakfast"
  },
  {
    name: "Appam",
    calories: 120,
    protein: 2.0,
    carbs: 21.0,
    fats: 2.8,
    fiber: 1.0,
    sugar: 1.5,
    sodium: 95,
    defaultUnit: "piece",
    weightPerPiece: 50,
    category: "breakfast"
  },
  {
    name: "Puttu",
    calories: 280,
    protein: 5.5,
    carbs: 56.0,
    fats: 3.5,
    fiber: 3.0,
    sugar: 0.2,
    sodium: 120,
    defaultUnit: "g",
    category: "breakfast"
  },
  {
    name: "Medu Vada",
    calories: 150,
    protein: 3.5,
    carbs: 16.0,
    fats: 8.2,
    fiber: 2.1,
    sugar: 0.1,
    sodium: 210,
    defaultUnit: "piece",
    weightPerPiece: 45,
    category: "breakfast"
  },
  {
    name: "Uttapam",
    calories: 215,
    protein: 4.8,
    carbs: 38.2,
    fats: 4.5,
    fiber: 2.5,
    sugar: 0.3,
    sodium: 240,
    defaultUnit: "piece",
    weightPerPiece: 100,
    category: "breakfast"
  },
  {
    name: "Bread Omelette",
    calories: 320,
    protein: 14.5,
    carbs: 26.0,
    fats: 17.5,
    fiber: 1.8,
    sugar: 1.2,
    sodium: 480,
    defaultUnit: "piece",
    weightPerPiece: 120,
    category: "breakfast"
  },
  {
    name: "Paneer Sandwich",
    calories: 380,
    protein: 16.2,
    carbs: 42.0,
    fats: 15.8,
    fiber: 4.2,
    sugar: 2.5,
    sodium: 410,
    defaultUnit: "piece",
    weightPerPiece: 150,
    category: "breakfast"
  },
  {
    name: "Pav Bhaji",
    calories: 450,
    protein: 10.5,
    carbs: 65.0,
    fats: 16.5,
    fiber: 7.8,
    sugar: 4.5,
    sodium: 680,
    defaultUnit: "piece",
    weightPerPiece: 220,
    category: "breakfast"
  },

  // RICE ITEMS
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
    category: "rice"
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
    category: "rice"
  },
  {
    name: "Lemon Rice",
    calories: 180,
    protein: 3.1,
    carbs: 29.0,
    fats: 5.8,
    fiber: 1.4,
    sugar: 0.1,
    sodium: 170,
    defaultUnit: "g",
    weightPerCup: 200,
    category: "rice"
  },
  {
    name: "Tomato Rice",
    calories: 170,
    protein: 2.9,
    carbs: 27.0,
    fats: 5.4,
    fiber: 1.6,
    sugar: 0.4,
    sodium: 195,
    defaultUnit: "g",
    weightPerCup: 200,
    category: "rice"
  },
  {
    name: "Curd Rice",
    calories: 145,
    protein: 3.6,
    carbs: 21.0,
    fats: 4.8,
    fiber: 0.9,
    sugar: 1.1,
    sodium: 140,
    defaultUnit: "g",
    weightPerCup: 200,
    category: "rice"
  },
  {
    name: "Coconut Rice",
    calories: 190,
    protein: 2.8,
    carbs: 26.0,
    fats: 8.3,
    fiber: 2.3,
    sugar: 0.3,
    sodium: 155,
    defaultUnit: "g",
    weightPerCup: 200,
    category: "rice"
  },
  {
    name: "Jeera Rice",
    calories: 145,
    protein: 2.6,
    carbs: 25.5,
    fats: 3.6,
    fiber: 1.0,
    sugar: 0.1,
    sodium: 140,
    defaultUnit: "g",
    weightPerCup: 200,
    category: "rice"
  },
  {
    name: "Veg Fried Rice",
    calories: 164,
    protein: 3.3,
    carbs: 28.8,
    fats: 3.9,
    fiber: 1.5,
    sugar: 0.6,
    sodium: 232,
    defaultUnit: "g",
    weightPerCup: 250,
    category: "rice"
  },
  {
    name: "Chicken Biryani",
    calories: 173,
    protein: 8.2,
    carbs: 22.7,
    fats: 5.5,
    fiber: 1.4,
    sugar: 0.6,
    sodium: 230,
    defaultUnit: "g",
    weightPerCup: 300,
    category: "rice"
  },
  {
    name: "Veg Biryani",
    calories: 137,
    protein: 3.3,
    carbs: 22.7,
    fats: 3.7,
    fiber: 1.8,
    sugar: 0.7,
    sodium: 207,
    defaultUnit: "g",
    weightPerCup: 300,
    category: "rice"
  },
  {
    name: "Pulao",
    calories: 140,
    protein: 2.7,
    carbs: 23.2,
    fats: 3.8,
    fiber: 1.3,
    sugar: 0.5,
    sodium: 164,
    defaultUnit: "g",
    weightPerCup: 250,
    category: "rice"
  },
  {
    name: "Sambar Rice",
    calories: 128,
    protein: 3.1,
    carbs: 21.6,
    fats: 3.0,
    fiber: 2.1,
    sugar: 0.3,
    sodium: 180,
    defaultUnit: "g",
    weightPerCup: 250,
    category: "rice"
  },
  {
    name: "Khichdi",
    calories: 116,
    protein: 3.4,
    carbs: 20.8,
    fats: 2.1,
    fiber: 1.9,
    sugar: 0.1,
    sodium: 156,
    defaultUnit: "g",
    weightPerCup: 250,
    category: "rice"
  },

  // CURRIES
  {
    name: "Butter Chicken",
    calories: 253,
    protein: 18.7,
    carbs: 5.7,
    fats: 17.0,
    fiber: 0.8,
    sugar: 2.8,
    sodium: 320,
    defaultUnit: "g",
    weightPerCup: 150,
    category: "curry"
  },
  {
    name: "Chicken Curry",
    calories: 163,
    protein: 16.1,
    carbs: 4.1,
    fats: 9.0,
    fiber: 1.2,
    sugar: 1.0,
    sodium: 280,
    defaultUnit: "g",
    weightPerCup: 150,
    category: "curry"
  },
  {
    name: "Paneer Butter Masala",
    calories: 240,
    protein: 8.3,
    carbs: 7.0,
    fats: 20.1,
    fiber: 1.0,
    sugar: 3.3,
    sodium: 300,
    defaultUnit: "g",
    weightPerCup: 150,
    category: "curry"
  },
  {
    name: "Dal Tadka",
    calories: 120,
    protein: 6.5,
    carbs: 16.0,
    fats: 3.5,
    fiber: 4.3,
    sugar: 0.2,
    sodium: 213,
    defaultUnit: "g",
    weightPerCup: 150,
    category: "curry"
  },
  {
    name: "Rajma Masala",
    calories: 140,
    protein: 7.0,
    carbs: 19.0,
    fats: 4.1,
    fiber: 5.0,
    sugar: 0.3,
    sodium: 253,
    defaultUnit: "g",
    weightPerCup: 150,
    category: "curry"
  },
  {
    name: "Chole Masala",
    calories: 147,
    protein: 6.1,
    carbs: 21.3,
    fats: 4.5,
    fiber: 5.3,
    sugar: 0.5,
    sodium: 273,
    defaultUnit: "g",
    weightPerCup: 150,
    category: "curry"
  },
  {
    name: "Sambar",
    calories: 63,
    protein: 2.1,
    carbs: 9.7,
    fats: 1.7,
    fiber: 2.8,
    sugar: 0.8,
    sodium: 260,
    defaultUnit: "ml",
    weightPerCup: 150,
    category: "curry"
  },
  {
    name: "Rasam",
    calories: 30,
    protein: 0.5,
    carbs: 4.3,
    fats: 1.2,
    fiber: 0.7,
    sugar: 0.1,
    sodium: 233,
    defaultUnit: "ml",
    weightPerCup: 150,
    category: "curry"
  },
  {
    name: "Kadai Paneer",
    calories: 207,
    protein: 9.2,
    carbs: 5.5,
    fats: 16.3,
    fiber: 1.5,
    sugar: 1.3,
    sodium: 280,
    defaultUnit: "g",
    weightPerCup: 150,
    category: "curry"
  },
  {
    name: "Fish Curry",
    calories: 140,
    protein: 14.7,
    carbs: 3.7,
    fats: 7.2,
    fiber: 0.8,
    sugar: 0.5,
    sodium: 300,
    defaultUnit: "g",
    weightPerCup: 150,
    category: "curry"
  },
  {
    name: "Egg Curry",
    calories: 173,
    protein: 9.9,
    carbs: 4.8,
    fats: 12.3,
    fiber: 1.0,
    sugar: 0.8,
    sodium: 287,
    defaultUnit: "g",
    weightPerCup: 150,
    category: "curry"
  },

  // SNACKS
  {
    name: "Samosa",
    calories: 300,
    protein: 5.0,
    carbs: 36.0,
    fats: 15.0,
    fiber: 2.4,
    sugar: 1.0,
    sodium: 360,
    defaultUnit: "piece",
    weightPerPiece: 100,
    category: "snacks"
  },
  {
    name: "Kachori",
    calories: 380,
    protein: 6.4,
    carbs: 42.0,
    fats: 21.0,
    fiber: 3.0,
    sugar: 0.4,
    sodium: 420,
    defaultUnit: "piece",
    weightPerPiece: 100,
    category: "snacks"
  },
  {
    name: "Murukku",
    calories: 500,
    protein: 7.3,
    carbs: 63.3,
    fats: 25.3,
    fiber: 3.3,
    sugar: 0.0,
    sodium: 633,
    defaultUnit: "piece",
    weightPerPiece: 15,
    category: "snacks"
  },
  {
    name: "Indian Mixture",
    calories: 520,
    protein: 10.4,
    carbs: 56.0,
    fats: 28.4,
    fiber: 3.6,
    sugar: 0.4,
    sodium: 580,
    defaultUnit: "g",
    category: "snacks"
  },
  {
    name: "Banana Chips",
    calories: 500,
    protein: 3.6,
    carbs: 64.0,
    fats: 27.0,
    fiber: 6.4,
    sugar: 9.0,
    sodium: 360,
    defaultUnit: "g",
    category: "snacks"
  },
  {
    name: "Pakora (Onion)",
    calories: 300,
    protein: 5.0,
    carbs: 32.5,
    fats: 17.5,
    fiber: 4.0,
    sugar: 1.0,
    sodium: 400,
    defaultUnit: "piece",
    weightPerPiece: 20,
    category: "snacks"
  },
  {
    name: "Bhujia",
    calories: 570,
    protein: 12.4,
    carbs: 48.0,
    fats: 37.0,
    fiber: 4.0,
    sugar: 1.0,
    sodium: 680,
    defaultUnit: "g",
    category: "snacks"
  },
  {
    name: "Vada Pav",
    calories: 300,
    protein: 6.5,
    carbs: 44.0,
    fats: 11.2,
    fiber: 3.2,
    sugar: 1.5,
    sodium: 420,
    defaultUnit: "piece",
    weightPerPiece: 100,
    category: "snacks"
  },
  {
    name: "Bhel Puri",
    calories: 180,
    protein: 3.5,
    carbs: 32.0,
    fats: 4.5,
    fiber: 2.8,
    sugar: 3.2,
    sodium: 310,
    defaultUnit: "g",
    category: "snacks"
  },
  {
    name: "Pani Puri",
    calories: 120,
    protein: 2.2,
    carbs: 22.0,
    fats: 2.5,
    fiber: 1.5,
    sugar: 0.8,
    sodium: 280,
    defaultUnit: "piece",
    weightPerPiece: 100,
    category: "snacks"
  },
  {
    name: "Sev Puri",
    calories: 210,
    protein: 4.2,
    carbs: 28.0,
    fats: 9.0,
    fiber: 2.2,
    sugar: 2.5,
    sodium: 340,
    defaultUnit: "piece",
    weightPerPiece: 120,
    category: "snacks"
  },
  {
    name: "Potato Chips",
    calories: 540,
    protein: 6.4,
    carbs: 53.0,
    fats: 35.0,
    fiber: 4.4,
    sugar: 1.0,
    sodium: 500,
    defaultUnit: "g",
    category: "snacks"
  },
  {
    name: "Popcorn (Butter)",
    calories: 480,
    protein: 9.0,
    carbs: 58.0,
    fats: 24.0,
    fiber: 10.0,
    sugar: 0.4,
    sodium: 640,
    defaultUnit: "g",
    category: "snacks"
  },

  // DESSERTS
  {
    name: "Gulab Jamun",
    calories: 375,
    protein: 5.0,
    carbs: 60.0,
    fats: 12.5,
    fiber: 0.5,
    sugar: 45.0,
    sodium: 112,
    defaultUnit: "piece",
    weightPerPiece: 40,
    category: "dessert"
  },
  {
    name: "Rasgulla",
    calories: 266,
    protein: 4.9,
    carbs: 57.8,
    fats: 2.2,
    fiber: 0.2,
    sugar: 44.4,
    sodium: 78,
    defaultUnit: "piece",
    weightPerPiece: 45,
    category: "dessert"
  },
  {
    name: "Jalebi",
    calories: 366,
    protein: 2.7,
    carbs: 73.3,
    fats: 7.3,
    fiber: 0.3,
    sugar: 53.3,
    sodium: 83,
    defaultUnit: "piece",
    weightPerPiece: 30,
    category: "dessert"
  },
  {
    name: "Kaju Katli",
    calories: 466,
    protein: 10.0,
    carbs: 56.6,
    fats: 23.3,
    fiber: 2.0,
    sugar: 41.3,
    sodium: 33,
    defaultUnit: "piece",
    weightPerPiece: 15,
    category: "dessert"
  },
  {
    name: "Mysore Pak",
    calories: 560,
    protein: 4.8,
    carbs: 60.0,
    fats: 34.0,
    fiber: 0.8,
    sugar: 48.0,
    sodium: 60,
    defaultUnit: "piece",
    weightPerPiece: 25,
    category: "dessert"
  },
  {
    name: "Payasam",
    calories: 147,
    protein: 3.5,
    carbs: 22.7,
    fats: 4.5,
    fiber: 0.3,
    sugar: 16.0,
    sodium: 53,
    defaultUnit: "cup",
    weightPerCup: 150,
    category: "dessert"
  },
  {
    name: "Besan Laddu",
    calories: 450,
    protein: 7.3,
    carbs: 60.0,
    fats: 20.7,
    fiber: 2.7,
    sugar: 40.0,
    sodium: 67,
    defaultUnit: "piece",
    weightPerPiece: 30,
    category: "dessert"
  },
  {
    name: "Gajar Halwa",
    calories: 260,
    protein: 3.8,
    carbs: 36.0,
    fats: 11.5,
    fiber: 1.8,
    sugar: 25.0,
    sodium: 75,
    defaultUnit: "g",
    category: "dessert"
  },
  {
    name: "Vanilla Ice Cream",
    calories: 200,
    protein: 3.5,
    carbs: 24.0,
    fats: 11.0,
    fiber: 0.0,
    sugar: 21.0,
    sodium: 50,
    defaultUnit: "cup",
    weightPerCup: 100,
    category: "dessert"
  },
  {
    name: "Rabdi",
    calories: 300,
    protein: 8.1,
    carbs: 31.3,
    fats: 16.0,
    fiber: 0.3,
    sugar: 25.0,
    sodium: 113,
    defaultUnit: "g",
    category: "dessert"
  },

  // DRINKS & JUICES
  {
    name: "Masala Chai",
    calories: 60,
    protein: 1.4,
    carbs: 9.3,
    fats: 1.7,
    fiber: 0.0,
    sugar: 8.0,
    sodium: 23,
    defaultUnit: "ml",
    weightPerCup: 150,
    category: "drinks"
  },
  {
    name: "Black Coffee",
    calories: 1,
    protein: 0.1,
    carbs: 0.0,
    fats: 0.0,
    fiber: 0.0,
    sugar: 0.0,
    sodium: 3,
    defaultUnit: "ml",
    weightPerCup: 150,
    category: "drinks"
  },
  {
    name: "Filter Coffee",
    calories: 73,
    protein: 2.0,
    carbs: 10.0,
    fats: 2.1,
    fiber: 0.0,
    sugar: 8.0,
    sodium: 30,
    defaultUnit: "ml",
    weightPerCup: 150,
    category: "drinks"
  },
  {
    name: "Badam Milk",
    calories: 120,
    protein: 3.7,
    carbs: 16.0,
    fats: 4.8,
    fiber: 0.5,
    sugar: 12.0,
    sodium: 40,
    defaultUnit: "ml",
    weightPerCup: 150,
    category: "drinks"
  },
  {
    name: "Sweet Lassi",
    calories: 88,
    protein: 2.3,
    carbs: 12.8,
    fats: 3.0,
    fiber: 0.0,
    sugar: 10.4,
    sodium: 38,
    defaultUnit: "ml",
    weightPerCup: 250,
    category: "drinks"
  },
  {
    name: "Buttermilk",
    calories: 24,
    protein: 1.0,
    carbs: 1.9,
    fats: 1.3,
    fiber: 0.0,
    sugar: 1.6,
    sodium: 96,
    defaultUnit: "ml",
    weightPerCup: 250,
    category: "drinks"
  },
  {
    name: "Sugarcane Juice",
    calories: 72,
    protein: 0.2,
    carbs: 18.0,
    fats: 0.0,
    fiber: 0.5,
    sugar: 16.0,
    sodium: 4,
    defaultUnit: "ml",
    weightPerCup: 250,
    category: "drinks"
  },
  {
    name: "Mango Juice",
    calories: 60,
    protein: 0.4,
    carbs: 15.2,
    fats: 0.1,
    fiber: 0.7,
    sugar: 12.8,
    sodium: 6,
    defaultUnit: "ml",
    weightPerCup: 250,
    category: "drinks"
  },
  {
    name: "Orange Juice",
    calories: 44,
    protein: 0.7,
    carbs: 10.4,
    fats: 0.1,
    fiber: 0.2,
    sugar: 8.0,
    sodium: 2,
    defaultUnit: "ml",
    weightPerCup: 250,
    category: "drinks"
  },
  {
    name: "Watermelon Juice",
    calories: 32,
    protein: 0.6,
    carbs: 7.2,
    fats: 0.2,
    fiber: 0.3,
    sugar: 6.0,
    sodium: 2,
    defaultUnit: "ml",
    weightPerCup: 250,
    category: "drinks"
  },
  {
    name: "Tender Coconut",
    calories: 18,
    protein: 0.7,
    carbs: 3.6,
    fats: 0.2,
    fiber: 1.0,
    sugar: 2.5,
    sodium: 100,
    defaultUnit: "ml",
    weightPerCup: 250,
    category: "drinks"
  },
  {
    name: "Lemon Juice",
    calories: 24,
    protein: 0.2,
    carbs: 6.0,
    fats: 0.0,
    fiber: 0.1,
    sugar: 4.8,
    sodium: 48,
    defaultUnit: "ml",
    weightPerCup: 250,
    category: "drinks"
  },

  // PROTEIN FOODS
  {
    name: "Chicken Breast",
    calories: 165,
    protein: 31.0,
    carbs: 0.0,
    fats: 3.6,
    fiber: 0.0,
    sugar: 0.0,
    sodium: 74,
    defaultUnit: "g",
    category: "protein"
  },
  {
    name: "Boiled Fish",
    calories: 110,
    protein: 23.0,
    carbs: 0.0,
    fats: 2.0,
    fiber: 0.0,
    sugar: 0.0,
    sodium: 70,
    defaultUnit: "g",
    category: "protein"
  },
  {
    name: "Whole Egg",
    calories: 143,
    protein: 12.6,
    carbs: 0.7,
    fats: 9.5,
    fiber: 0.0,
    sugar: 0.3,
    sodium: 142,
    defaultUnit: "piece",
    weightPerPiece: 50,
    category: "protein"
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
    category: "protein"
  },
  {
    name: "Tofu",
    calories: 76,
    protein: 8.0,
    carbs: 1.9,
    fats: 4.8,
    fiber: 0.3,
    sugar: 0.0,
    sodium: 7,
    defaultUnit: "g",
    category: "protein"
  },
  {
    name: "Soya Chunks",
    calories: 345,
    protein: 52.0,
    carbs: 33.0,
    fats: 0.5,
    fiber: 13.0,
    sugar: 0.0,
    sodium: 15,
    defaultUnit: "g",
    category: "protein"
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
    category: "protein"
  },
  {
    name: "Whey Protein",
    calories: 375,
    protein: 75.0,
    carbs: 9.4,
    fats: 4.7,
    fiber: 0.0,
    sugar: 3.1,
    sodium: 172,
    defaultUnit: "g",
    category: "protein"
  },
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
    category: "protein"
  },
  {
    name: "Plain Curd",
    calories: 60,
    protein: 3.5,
    carbs: 4.7,
    fats: 3.3,
    fiber: 0.0,
    sugar: 4.7,
    sodium: 45,
    defaultUnit: "g",
    category: "protein"
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
    category: "protein"
  },

  // NUTS & DRY FRUITS
  {
    name: "Almonds",
    calories: 579,
    protein: 21.0,
    carbs: 21.6,
    fats: 50.0,
    fiber: 12.5,
    sugar: 4.2,
    sodium: 1,
    defaultUnit: "g",
    category: "protein"
  },
  {
    name: "Cashews",
    calories: 553,
    protein: 18.2,
    carbs: 30.1,
    fats: 43.8,
    fiber: 3.3,
    sugar: 5.9,
    sodium: 12,
    defaultUnit: "g",
    category: "protein"
  },
  {
    name: "Pistachios",
    calories: 560,
    protein: 20.0,
    carbs: 27.2,
    fats: 45.3,
    fiber: 10.6,
    sugar: 7.7,
    sodium: 1,
    defaultUnit: "g",
    category: "protein"
  },
  {
    name: "Walnuts",
    calories: 654,
    protein: 15.2,
    carbs: 13.7,
    fats: 65.2,
    fiber: 6.7,
    sugar: 2.6,
    sodium: 2,
    defaultUnit: "g",
    category: "protein"
  },
  {
    name: "Raisins",
    calories: 299,
    protein: 3.1,
    carbs: 79.2,
    fats: 0.5,
    fiber: 3.7,
    sugar: 59.2,
    sodium: 11,
    defaultUnit: "g",
    category: "protein"
  },
  {
    name: "Dates",
    calories: 277,
    protein: 1.8,
    carbs: 75.0,
    fats: 0.2,
    fiber: 6.7,
    sugar: 66.0,
    sodium: 1,
    defaultUnit: "g",
    category: "protein"
  },
  {
    name: "Peanuts",
    calories: 567,
    protein: 25.8,
    carbs: 16.1,
    fats: 49.2,
    fiber: 8.5,
    sugar: 4.7,
    sodium: 18,
    defaultUnit: "g",
    category: "protein"
  },

  // FAST FOODS
  {
    name: "Cheese Pizza",
    calories: 266,
    protein: 11.4,
    carbs: 30.0,
    fats: 10.1,
    fiber: 2.3,
    sugar: 3.6,
    sodium: 550,
    defaultUnit: "g",
    category: "fast-food"
  },
  {
    name: "Chicken Burger",
    calories: 240,
    protein: 12.0,
    carbs: 25.3,
    fats: 10.0,
    fiber: 1.3,
    sugar: 3.6,
    sodium: 413,
    defaultUnit: "piece",
    weightPerPiece: 150,
    category: "fast-food"
  },
  {
    name: "French Fries",
    calories: 312,
    protein: 3.4,
    carbs: 41.0,
    fats: 15.0,
    fiber: 3.8,
    sugar: 0.3,
    sodium: 210,
    defaultUnit: "g",
    category: "fast-food"
  },
  {
    name: "Veg Noodles",
    calories: 160,
    protein: 3.2,
    carbs: 29.0,
    fats: 3.6,
    fiber: 1.2,
    sugar: 0.9,
    sodium: 240,
    defaultUnit: "g",
    weightPerCup: 200,
    category: "fast-food"
  },
  {
    name: "Veg Momos",
    calories: 120,
    protein: 3.2,
    carbs: 22.6,
    fats: 1.6,
    fiber: 1.2,
    sugar: 0.8,
    sodium: 213,
    defaultUnit: "piece",
    weightPerPiece: 25,
    category: "fast-food"
  },
  {
    name: "Chicken Shawarma",
    calories: 210,
    protein: 14.0,
    carbs: 18.0,
    fats: 9.0,
    fiber: 1.6,
    sugar: 1.4,
    sodium: 345,
    defaultUnit: "piece",
    weightPerPiece: 200,
    category: "fast-food"
  },
  {
    name: "Fried Chicken",
    calories: 280,
    protein: 19.5,
    carbs: 8.2,
    fats: 18.5,
    fiber: 0.5,
    sugar: 0.1,
    sodium: 490,
    defaultUnit: "g",
    weightPerPiece: 100,
    category: "fast-food"
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
    if (foodCount < 70) {
      console.log(`Food count is ${foodCount}. Clearing and re-seeding with expanded Indian foods dataset...`);
      await Food.deleteMany({});
      await Food.insertMany(foodsData);
      console.log('Indian Foods Seeded Successfully!');
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

export { seedAllData };
