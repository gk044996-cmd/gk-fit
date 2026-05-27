import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import { seedAllData } from '../utils/seedData.js';
import authRoutes from '../routes/authRoutes.js';
import workoutRoutes from '../routes/workoutRoutes.js';
import foodRoutes from '../routes/foodRoutes.js';
import nutritionRoutes from '../routes/nutritionRoutes.js';
import progressRoutes from '../routes/progressRoutes.js';
import fitFormRoutes from '../routes/fitFormRoutes.js';
import { notFound, errorHandler } from '../middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Standard middleware
app.use(cors());
app.use(express.json());

// Database connection state cache
let dbConnected = false;
const connectAndSeed = async () => {
  if (dbConnected || mongoose.connection.readyState >= 1) {
    return;
  }
  await connectDB();
  await seedAllData();
  dbConnected = true;
};

// Middleware to ensure DB connection is ready on serverless invocation
app.use(async (req, res, next) => {
  try {
    await connectAndSeed();
    next();
  } catch (error) {
    next(error);
  }
});

// Root welcome route
app.get('/', (req, res) => {
  res.json({ message: 'GK FIT Premium Fitness Guide API is running...' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/fit-form', fitFormRoutes);

// Error middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
