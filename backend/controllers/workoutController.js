import Workout from '../models/Workout.js';

// @desc    Get all workouts with filtering & search
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    const workouts = await Workout.find(query);

    // Manual filtering for search to maintain compatibility with fallbackDb
    let filteredWorkouts = workouts;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredWorkouts = workouts.filter(w =>
        w.title.toLowerCase().includes(searchLower) ||
        (w.description && w.description.toLowerCase().includes(searchLower))
      );
    }

    res.json(filteredWorkouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single workout details
// @route   GET /api/workouts/:id
// @access  Private
const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (workout) {
      res.json(workout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getWorkouts, getWorkoutById };
