import mongoose from 'mongoose';
import { fallbackDb } from '../config/fallbackDb.js';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  calories: { type: Number, required: true }, // kcal per 100g/ml or per piece
  protein: { type: Number, required: true },  // g per 100g/ml or per piece
  carbs: { type: Number, required: true },    // g per 100g/ml or per piece
  fats: { type: Number, required: true },     // g per 100g/ml or per piece
  fiber: { type: Number, default: 0 },         // g per 100g/ml or per piece
  sugar: { type: Number, default: 0 },         // g per 100g/ml or per piece
  sodium: { type: Number, default: 0 },       // mg per 100g/ml or per piece
  defaultUnit: { 
    type: String, 
    required: true,
    enum: ['g', 'ml', 'piece', 'cup'],
    default: 'g'
  },
  weightPerPiece: { type: Number }, // in grams, for piece conversion
  weightPerCup: { type: Number },   // in grams, for cup conversion
  category: { type: String, required: true }
}, { timestamps: true });

const MongooseFood = mongoose.models.Food || mongoose.model('Food', foodSchema);

const FoodProxy = {
  find: (...args) => global.useFallbackDb ? fallbackDb.foods.find(...args) : MongooseFood.find(...args),
  findOne: (...args) => global.useFallbackDb ? fallbackDb.foods.findOne(...args) : MongooseFood.findOne(...args),
  findById: (...args) => global.useFallbackDb ? fallbackDb.foods.findById(...args) : MongooseFood.findById(...args),
  create: (...args) => global.useFallbackDb ? fallbackDb.foods.create(...args) : MongooseFood.create(...args),
  findByIdAndUpdate: (...args) => global.useFallbackDb ? fallbackDb.foods.findByIdAndUpdate(...args) : MongooseFood.findByIdAndUpdate(...args),
  findOneAndUpdate: (...args) => global.useFallbackDb ? fallbackDb.foods.findOneAndUpdate(...args) : MongooseFood.findOneAndUpdate(...args),
  countDocuments: (...args) => global.useFallbackDb ? fallbackDb.foods.countDocuments(...args) : MongooseFood.countDocuments(...args),
  insertMany: (...args) => global.useFallbackDb ? fallbackDb.foods.insertMany(...args) : MongooseFood.insertMany(...args),
  deleteMany: (...args) => global.useFallbackDb ? fallbackDb.foods.write([]) : MongooseFood.deleteMany(...args),
};

export default FoodProxy;
