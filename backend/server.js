import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { seedAllData } from './utils/seedData.js';
import authRoutes from './routes/authRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import nutritionRoutes from './routes/nutritionRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import fitFormRoutes from './routes/fitFormRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Standard middleware
app.use(cors());
app.use(express.json());

// Main entry starting routine
const startServer = async () => {
  // Connect to Database
  await connectDB();
  
  // Seed Database (MongoDB or fallback)
  await seedAllData();

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

  // Start listener
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    if (global.useFallbackDb) {
      console.log('⚡ Running with Zero-Config Fallback JSON Database (offline-safe).');
    } else {
      console.log('🌱 Connected to live MongoDB Database.');
    }
  });
};

startServer();
