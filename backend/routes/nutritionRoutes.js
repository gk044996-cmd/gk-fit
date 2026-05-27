import express from 'express';
import {
  getDailyIntake,
  addFoodIntake,
  editFoodIntake,
  removeFoodIntake
} from '../controllers/nutritionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/daily')
  .get(protect, getDailyIntake);

router.route('/add')
  .post(protect, addFoodIntake);

router.route('/edit/:logId')
  .put(protect, editFoodIntake);

router.route('/remove/:logId')
  .delete(protect, removeFoodIntake);

export default router;
