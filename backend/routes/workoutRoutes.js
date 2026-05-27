import express from 'express';
import { getWorkouts, getWorkoutById } from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getWorkouts);

router.route('/:id')
  .get(protect, getWorkoutById);

export default router;
