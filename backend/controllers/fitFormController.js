import FitFormHistory from '../models/FitFormHistory.js';

// @desc    Log a completed camera-based exercise form check session
// @route   POST /api/fit-form/log
// @access  Private
const logFitFormSession = async (req, res) => {
  try {
    const { exercise, reps, duration, accuracy, caloriesBurned, status, feedback, date } = req.body;
    const userId = req.user._id;

    if (!exercise || reps === undefined || !duration || accuracy === undefined || caloriesBurned === undefined || !status || !date) {
      return res.status(400).json({ message: 'Please provide all required workout summary parameters' });
    }

    const session = await FitFormHistory.create({
      userId,
      exercise,
      reps: Number(reps),
      duration: Number(duration),
      accuracy: Number(accuracy),
      caloriesBurned: Number(caloriesBurned),
      status,
      feedback: feedback || [],
      date
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's pose check session history
// @route   GET /api/fit-form/history
// @access  Private
const getFitFormHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const logs = await FitFormHistory.find({ userId });
    
    // Sort logs descending (latest first)
    const sortedLogs = logs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(sortedLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  logFitFormSession,
  getFitFormHistory
};
