import Food from '../models/Food.js';

// @desc    Get all foods or search foods
// @route   GET /api/foods
// @access  Private
const getFoods = async (req, res) => {
  try {
    const { search } = req.query;
    let foods;

    if (search) {
      const searchLower = search.toLowerCase();
      const allFoods = await Food.find({});
      // case-insensitive match compatible with both MongoDB regex and fallbackDb
      foods = allFoods.filter(f => f.name.toLowerCase().includes(searchLower));
    } else {
      foods = await Food.find({});
    }

    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getFoods };
