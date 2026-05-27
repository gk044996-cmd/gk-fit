import mongoose from 'mongoose';
import { fallbackDb } from '../config/fallbackDb.js';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  targetMuscle: { type: String, required: true },
  instructions: [{ type: String }],
  commonMistakes: [{ type: String }],
  benefits: [{ type: String }],
  sets: { type: Number, default: 3 },
  reps: { type: String, default: '10-12' },
  durationSeconds: { type: Number, default: 60 }
});

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Muscle Gain', 'Fat Loss', 'Home Workout'] 
  },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  duration: { type: Number, required: true }, // in minutes
  caloriesBurned: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  exercises: [exerciseSchema]
}, { timestamps: true });

const MongooseWorkout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

const WorkoutProxy = {
  find: (...args) => global.useFallbackDb ? fallbackDb.workouts.find(...args) : MongooseWorkout.find(...args),
  findOne: (...args) => global.useFallbackDb ? fallbackDb.workouts.findOne(...args) : MongooseWorkout.findOne(...args),
  findById: (...args) => global.useFallbackDb ? fallbackDb.workouts.findById(...args) : MongooseWorkout.findById(...args),
  create: (...args) => global.useFallbackDb ? fallbackDb.workouts.create(...args) : MongooseWorkout.create(...args),
  findByIdAndUpdate: (...args) => global.useFallbackDb ? fallbackDb.workouts.findByIdAndUpdate(...args) : MongooseWorkout.findByIdAndUpdate(...args),
  findOneAndUpdate: (...args) => global.useFallbackDb ? fallbackDb.workouts.findOneAndUpdate(...args) : MongooseWorkout.findOneAndUpdate(...args),
  countDocuments: (...args) => global.useFallbackDb ? fallbackDb.workouts.countDocuments(...args) : MongooseWorkout.countDocuments(...args),
  insertMany: (...args) => global.useFallbackDb ? fallbackDb.workouts.insertMany(...args) : MongooseWorkout.insertMany(...args),
};

export default WorkoutProxy;
