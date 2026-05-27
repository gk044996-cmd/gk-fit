import express from 'express';
import {
  logProgress,
  getProgressHistory,
  getDashboardStats,
} from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, logProgress);

router.route('/history')
  .get(protect, getProgressHistory);

router.route('/dashboard')
  .get(protect, getDashboardStats);

export default router;
