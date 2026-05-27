import express from 'express';
import {
  logFitFormSession,
  getFitFormHistory
} from '../controllers/fitFormController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/log')
  .post(protect, logFitFormSession);

router.route('/history')
  .get(protect, getFitFormHistory);

export default router;
