import mongoose from 'mongoose';
import { fallbackDb } from '../config/fallbackDb.js';

const loggedFoodSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true, enum: ['g', 'ml', 'piece', 'cup'] },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  fiber: { type: Number, default: 0 },
  sugar: { type: Number, default: 0 },
  sodium: { type: Number, default: 0 }
});

const dailyIntakeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  meals: {
    breakfast: [loggedFoodSchema],
    lunch: [loggedFoodSchema],
    dinner: [loggedFoodSchema],
    snacks: [loggedFoodSchema]
  }
}, { timestamps: true });

// Ensure unique index per user per date
dailyIntakeSchema.index({ userId: 1, date: 1 }, { unique: true });

const MongooseDailyIntake = mongoose.models.DailyIntake || mongoose.model('DailyIntake', dailyIntakeSchema);

const DailyIntakeProxy = {
  find: (...args) => global.useFallbackDb ? fallbackDb.intakes.find(...args) : MongooseDailyIntake.find(...args),
  findOne: (...args) => global.useFallbackDb ? fallbackDb.intakes.findOne(...args) : MongooseDailyIntake.findOne(...args),
  findById: (...args) => global.useFallbackDb ? fallbackDb.intakes.findById(...args) : MongooseDailyIntake.findById(...args),
  create: (...args) => global.useFallbackDb ? fallbackDb.intakes.create(...args) : MongooseDailyIntake.create(...args),
  findByIdAndUpdate: (...args) => global.useFallbackDb ? fallbackDb.intakes.findByIdAndUpdate(...args) : MongooseDailyIntake.findByIdAndUpdate(...args),
  findOneAndUpdate: (...args) => global.useFallbackDb ? fallbackDb.intakes.findOneAndUpdate(...args) : MongooseDailyIntake.findOneAndUpdate(...args),
  countDocuments: (...args) => global.useFallbackDb ? fallbackDb.intakes.countDocuments(...args) : MongooseDailyIntake.countDocuments(...args),
  insertMany: (...args) => global.useFallbackDb ? fallbackDb.intakes.insertMany(...args) : MongooseDailyIntake.insertMany(...args),
};

export default DailyIntakeProxy;
