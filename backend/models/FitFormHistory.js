import mongoose from 'mongoose';
import { fallbackDb } from '../config/fallbackDb.js';

const fitFormHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exercise: { type: String, required: true },
  reps: { type: Number, required: true },
  duration: { type: Number, required: true }, // in seconds
  accuracy: { type: Number, required: true },  // percentage
  caloriesBurned: { type: Number, required: true },
  status: { type: String, required: true }, // 'Correct', 'Needs Improvement', 'Incorrect'
  feedback: { type: [String], default: [] },
  date: { type: String, required: true } // Format: YYYY-MM-DD
}, { timestamps: true });

const MongooseFitFormHistory = mongoose.models.FitFormHistory || mongoose.model('FitFormHistory', fitFormHistorySchema);

const FitFormHistoryProxy = {
  find: (...args) => global.useFallbackDb ? fallbackDb.fitFormHistory.find(...args) : MongooseFitFormHistory.find(...args),
  findOne: (...args) => global.useFallbackDb ? fallbackDb.fitFormHistory.findOne(...args) : MongooseFitFormHistory.findOne(...args),
  findById: (...args) => global.useFallbackDb ? fallbackDb.fitFormHistory.findById(...args) : MongooseFitFormHistory.findById(...args),
  create: (...args) => global.useFallbackDb ? fallbackDb.fitFormHistory.create(...args) : MongooseFitFormHistory.create(...args),
  findByIdAndUpdate: (...args) => global.useFallbackDb ? fallbackDb.fitFormHistory.findByIdAndUpdate(...args) : MongooseFitFormHistory.findByIdAndUpdate(...args),
  findOneAndUpdate: (...args) => global.useFallbackDb ? fallbackDb.fitFormHistory.findOneAndUpdate(...args) : MongooseFitFormHistory.findOneAndUpdate(...args),
  countDocuments: (...args) => global.useFallbackDb ? fallbackDb.fitFormHistory.countDocuments(...args) : MongooseFitFormHistory.countDocuments(...args),
  insertMany: (...args) => global.useFallbackDb ? fallbackDb.fitFormHistory.insertMany(...args) : MongooseFitFormHistory.insertMany(...args),
};

export default FitFormHistoryProxy;
