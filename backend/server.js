const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Workouts mock data & routes
const mockWorkouts = [
  {
    _id: "w1",
    title: "Beginner's Full Body Starter",
    category: "Beginner",
    difficulty: "Easy",
    duration: 30,
    caloriesBurned: 220,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=60",
    description: "A perfect routine for gym beginners designed to build coordination, joint strength, and initial fitness capacity.",
    exercises: []
  },
  {
    _id: "w2",
    title: "High Intensity Fat Burner",
    category: "Fat Loss",
    difficulty: "Hard",
    duration: 40,
    caloriesBurned: 480,
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&auto=format&fit=crop&q=60",
    description: "A fast-paced cardio and conditioning workout aimed at spiking the heart rate and maximizing post-exercise oxygen consumption.",
    exercises: []
  },
  {
    _id: "w3",
    title: "Hypertrophy Upper Body Blast",
    category: "Muscle Gain",
    difficulty: "Hard",
    duration: 50,
    caloriesBurned: 420,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=60",
    description: "Focused resistance training targeting the chest, back, and shoulders for maximum muscle growth and definition.",
    exercises: []
  }
];

app.get("/api/workouts", (req, res) => {
  res.json(mockWorkouts);
});

app.get("/api/workouts/:id", (req, res) => {
  const workout = mockWorkouts.find(w => w._id === req.params.id) || mockWorkouts[0];
  res.json(workout);
});

// Progress mock data & routes
app.get("/api/progress/dashboard", (req, res) => {
  res.json({
    todayStats: {
      waterIntake: 1200,
      streak: 3
    },
    weeklyData: [
      { date: "Mon", value: 45 },
      { date: "Tue", value: 50 },
      { date: "Wed", value: 40 },
      { date: "Thu", value: 60 },
      { date: "Fri", value: 55 },
      { date: "Sat", value: 70 },
      { date: "Sun", value: 65 }
    ],
    achievements: [
      { id: "a1", name: "Consistency King", icon: "🔥" },
      { id: "a2", name: "Hydration Hero", icon: "💧" }
    ],
    quote: "Success isn't always about greatness. It's about consistency."
  });
});

app.post("/api/progress", (req, res) => {
  res.json({ success: true });
});

app.get("/api/progress/history", (req, res) => {
  res.json([]);
});

// Nutrition mock data & routes
app.get("/api/nutrition/daily", (req, res) => {
  res.json({
    meals: {
      breakfast: [
        { name: "Oats & Banana", calories: 350, protein: 12, carbs: 60, fats: 5 }
      ],
      lunch: [
        { name: "Grilled Chicken & Rice", calories: 550, protein: 40, carbs: 70, fats: 8 }
      ],
      dinner: [
        { name: "Paneer Salad", calories: 400, protein: 20, carbs: 15, fats: 22 }
      ],
      snacks: []
    }
  });
});

app.post("/api/nutrition/add", (req, res) => {
  res.json({ success: true });
});

app.put("/api/nutrition/edit/:id", (req, res) => {
  res.json({ success: true });
});

app.delete("/api/nutrition/remove/:id", (req, res) => {
  res.json({ success: true });
});

app.get("/api/foods", (req, res) => {
  res.json([
    { name: "Grilled Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, defaultUnit: "g" },
    { name: "Whole Egg (Large)", calories: 143, protein: 12.6, carbs: 0.7, fats: 9.5, defaultUnit: "piece" },
    { name: "White Rice (Cooked)", calories: 130, protein: 2.7, carbs: 28, fats: 0.3, defaultUnit: "g" }
  ]);
});

// Fit Form mock data & routes
app.get("/api/fit-form/history", (req, res) => {
  res.json([
    {
      _id: "s1",
      exercise: "Squat",
      reps: 15,
      duration: 45,
      accuracy: 95,
      caloriesBurned: 18,
      status: "Correct",
      feedback: ["Strict biomechanical movement. Excellent!"],
      date: new Date().toISOString().split('T')[0]
    }
  ]);
});

app.post("/api/fit-form/log", (req, res) => {
  res.json({ success: true });
});

// Welcome landing route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GK FIT Backend Running Successfully"
  });
});

module.exports = app;
