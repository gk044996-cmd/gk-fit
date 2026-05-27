import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/tokenGenerator.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, gender, age, height, weight, fitnessGoal } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields (name, email, password)' });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      gender: gender || 'Male',
      age: Number(age) || 22,
      height: Number(height) || 170,
      weight: Number(weight) || 65,
      fitnessGoal: fitnessGoal || 'Get Fit',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        height: user.height,
        weight: user.weight,
        fitnessGoal: user.fitnessGoal,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          gender: user.gender,
          age: user.age,
          height: user.height,
          weight: user.weight,
          fitnessGoal: user.fitnessGoal,
          token: generateToken(user._id),
        });
      }
    }

    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        height: user.height,
        weight: user.weight,
        fitnessGoal: user.fitnessGoal,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const updates = {
        name: req.body.name || user.name,
        gender: req.body.gender || user.gender,
        age: req.body.age !== undefined ? Number(req.body.age) : user.age,
        height: req.body.height !== undefined ? Number(req.body.height) : user.height,
        weight: req.body.weight !== undefined ? Number(req.body.weight) : user.weight,
        fitnessGoal: req.body.fitnessGoal || user.fitnessGoal,
      };

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, { new: true });

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        gender: updatedUser.gender,
        age: updatedUser.age,
        height: updatedUser.height,
        weight: updatedUser.weight,
        fitnessGoal: updatedUser.fitnessGoal,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerUser, loginUser, getUserProfile, updateUserProfile };
