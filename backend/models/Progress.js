import mongoose from 'mongoose';
import { fallbackDb } from '../config/fallbackDb.js';

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  weight: { type: Number }, // in kg
  waterIntake: { type: Number, default: 0 }, // in ml
  workoutDuration: { type: Number, default: 0 }, // in minutes
  caloriesBurned: { type: Number, default: 0 }, // in kcal
  workoutsCompleted: [{ type: String }], // Array of workout IDs or titles
  streak: { type: Number, default: 0 }
}, { timestamps: true });

// Compound index to ensure one progress log per user per day
progressSchema.index({ userId: 1, date: 1 }, { unique: true });

const MongooseProgress = mongoose.models.Progress || mongoose.model('Progress', progressSchema);

const ProgressProxy = {
  find: (...args) => global.useFallbackDb ? fallbackDb.progress.find(...args) : MongooseProgress.find(...args),
  findOne: (...args) => global.useFallbackDb ? fallbackDb.progress.findOne(...args) : MongooseProgress.findOne(...args),
  findById: (...args) => global.useFallbackDb ? fallbackDb.progress.findById(...args) : MongooseProgress.findById(...args),
  create: (...args) => global.useFallbackDb ? fallbackDb.progress.create(...args) : MongooseProgress.create(...args),
  findByIdAndUpdate: (...args) => global.useFallbackDb ? fallbackDb.progress.findByIdAndUpdate(...args) : MongooseProgress.findByIdAndUpdate(...args),
  findOneAndUpdate: (...args) => global.useFallbackDb ? fallbackDb.progress.findOneAndUpdate(...args) : MongooseProgress.findOneAndUpdate(...args),
  countDocuments: (...args) => global.useFallbackDb ? fallbackDb.progress.countDocuments(...args) : MongooseProgress.countDocuments(...args),
  insertMany: (...args) => global.useFallbackDb ? fallbackDb.progress.insertMany(...args) : MongooseProgress.insertMany(...args),
};

export default ProgressProxy;
