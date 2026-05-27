import Progress from '../models/Progress.js';
import User from '../models/User.js';

// Get YYYY-MM-DD date string
const getTodayDateString = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

// @desc    Log/Update user daily progress
// @route   POST /api/progress
// @access  Private
const logProgress = async (req, res) => {
  const userId = req.user._id;
  const date = req.body.date || getTodayDateString();
  const { weight, waterIntake, workoutDuration, caloriesBurned, workoutCompleted } = req.body;

  try {
    // 1. Find progress log for today
    let log = await Progress.findOne({ userId, date });

    let currentStreak = 1;

    // Calculate streak if creating a new log
    if (!log) {
      // Find yesterday's date
      const d = new Date(date);
      d.setDate(d.getDate() - 1);
      const yesterday = d.toISOString().split('T')[0];

      const yesterdayLog = await Progress.findOne({ userId, date: yesterday });
      if (yesterdayLog) {
        currentStreak = (yesterdayLog.streak || 0) + 1;
      } else {
        currentStreak = 1;
      }
    } else {
      currentStreak = log.streak || 1;
    }

    const updateFields = {};
    if (weight !== undefined) updateFields.weight = Number(weight);
    
    if (waterIntake !== undefined) {
      if (req.body.isAdditive && log) {
        updateFields.waterIntake = (log.waterIntake || 0) + Number(waterIntake);
      } else {
        updateFields.waterIntake = Number(waterIntake);
      }
    }
    
    if (workoutDuration !== undefined) {
      if (req.body.isAdditive && log) {
        updateFields.workoutDuration = (log.workoutDuration || 0) + Number(workoutDuration);
      } else {
        updateFields.workoutDuration = Number(workoutDuration);
      }
    }
    
    if (caloriesBurned !== undefined) {
      if (req.body.isAdditive && log) {
        updateFields.caloriesBurned = (log.caloriesBurned || 0) + Number(caloriesBurned);
      } else {
        updateFields.caloriesBurned = Number(caloriesBurned);
      }
    }
    
    if (workoutCompleted) {
      if (log && log.workoutsCompleted) {
        if (!log.workoutsCompleted.includes(workoutCompleted)) {
          updateFields.workoutsCompleted = [...log.workoutsCompleted, workoutCompleted];
        }
      } else {
        updateFields.workoutsCompleted = [workoutCompleted];
      }
    }

    updateFields.streak = currentStreak;

    const options = { upsert: true, new: true };
    const updatedLog = await Progress.findOneAndUpdate(
      { userId, date },
      updateFields,
      options
    );

    // If weight was logged, update it in the User profile as well
    if (weight !== undefined) {
      await User.findByIdAndUpdate(userId, { weight: Number(weight) });
    }

    res.json(updatedLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get progress history logs
// @route   GET /api/progress/history
// @access  Private
const getProgressHistory = async (req, res) => {
  const userId = req.user._id;
  try {
    const history = await Progress.find({ userId });
    // Sort by date ascending
    const sortedHistory = history.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(sortedHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard metrics & trends
// @route   GET /api/progress/dashboard
// @access  Private
const getDashboardStats = async (req, res) => {
  const userId = req.user._id;
  const today = getTodayDateString();

  try {
    const todayLog = await Progress.findOne({ userId, date: today });
    const allLogs = await Progress.find({ userId });

    // Sorted history by date
    const sortedLogs = allLogs.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Get current streak
    let streak = 0;
    if (todayLog) {
      streak = todayLog.streak || 1;
    } else if (sortedLogs.length > 0) {
      const lastLog = sortedLogs[sortedLogs.length - 1];
      const lastLogDate = new Date(lastLog.date);
      const diffTime = Math.abs(new Date(today) - lastLogDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) {
        streak = lastLog.streak || 1;
      }
    }

    // Latest weight
    let currentWeight = req.user.weight || 70;
    if (todayLog && todayLog.weight) {
      currentWeight = todayLog.weight;
    } else if (sortedLogs.length > 0) {
      // search backwards for a logged weight
      for (let i = sortedLogs.length - 1; i >= 0; i--) {
        if (sortedLogs[i].weight) {
          currentWeight = sortedLogs[i].weight;
          break;
        }
      }
    }

    // Weekly analytics (last 7 days of dates)
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      // Find log for this day
      const dayLog = sortedLogs.find(l => l.date === dateStr);
      
      // Get display day name (e.g. Mon, Tue)
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

      weeklyData.push({
        date: dateStr,
        day: dayName,
        calories: dayLog ? dayLog.caloriesBurned : 0,
        water: dayLog ? dayLog.waterIntake : 0,
        weight: dayLog && dayLog.weight ? dayLog.weight : currentWeight,
        duration: dayLog ? dayLog.workoutDuration : 0
      });
    }

    // Monthly weight data (up to last 30 logs)
    const monthlyWeightData = sortedLogs
      .filter(l => l.weight)
      .slice(-30)
      .map(l => ({
        date: l.date.substring(5), // MM-DD
        weight: l.weight
      }));

    // Achievements calculation
    const achievements = [];
    const totalWorkoutsCount = sortedLogs.reduce((sum, l) => sum + (l.workoutsCompleted ? l.workoutsCompleted.length : 0), 0);
    const totalWaterCount = sortedLogs.reduce((sum, l) => sum + (l.waterIntake || 0), 0);

    if (streak >= 3) achievements.push({ id: 'streak_3', title: 'Consistency Champion', desc: 'Maintain a 3-day workout streak', icon: '🔥' });
    if (streak >= 7) achievements.push({ id: 'streak_7', title: 'Fitness Devotee', desc: 'Maintain a 7-day workout streak', icon: '⚡' });
    if (totalWorkoutsCount >= 3) achievements.push({ id: 'workouts_3', title: 'Workout Warrior', desc: 'Complete 3 fitness sessions', icon: '💪' });
    if (totalWaterCount >= 5000) achievements.push({ id: 'water_5k', title: 'Hydration Hero', desc: 'Drink a total of 5L water', icon: '💧' });
    
    // Always include a starter badge
    achievements.push({ id: 'welcome', title: 'First Step Taken', desc: 'Create your account and start your journey', icon: '🚀' });

    // Quotes pool
    const quotes = [
      "The only bad workout is the one that didn't happen.",
      "Suck it up now so you don't have to suck it in later.",
      "Your body can stand almost anything. It's your mind that you have to convince.",
      "Fitness is not about being better than someone else. It's about being better than you used to be.",
      "What hurts today makes you stronger tomorrow.",
      "Success starts with self-discipline."
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    res.json({
      todayStats: {
        caloriesBurned: todayLog ? todayLog.caloriesBurned : 0,
        waterIntake: todayLog ? todayLog.waterIntake : 0,
        workoutDuration: todayLog ? todayLog.workoutDuration : 0,
        weight: currentWeight,
        streak: streak || 1
      },
      weeklyData,
      monthlyWeightData,
      achievements,
      quote
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { logProgress, getProgressHistory, getDashboardStats };
