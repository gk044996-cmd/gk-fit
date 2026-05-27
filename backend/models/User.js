import mongoose from 'mongoose';
import { fallbackDb } from '../config/fallbackDb.js';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  fitnessGoal: { type: String, enum: ['Muscle Gain', 'Fat Loss', 'Maintenance', 'Get Fit'], default: 'Get Fit' },
}, { timestamps: true });

const MongooseUser = mongoose.models.User || mongoose.model('User', userSchema);

const UserProxy = {
  findOne: (...args) => global.useFallbackDb ? fallbackDb.users.findOne(...args) : MongooseUser.findOne(...args),
  findById: (...args) => global.useFallbackDb ? fallbackDb.users.findById(...args) : MongooseUser.findById(...args),
  create: (...args) => global.useFallbackDb ? fallbackDb.users.create(...args) : MongooseUser.create(...args),
  findByIdAndUpdate: (...args) => global.useFallbackDb ? fallbackDb.users.findByIdAndUpdate(...args) : MongooseUser.findByIdAndUpdate(...args),
  findOneAndUpdate: (...args) => global.useFallbackDb ? fallbackDb.users.findOneAndUpdate(...args) : MongooseUser.findOneAndUpdate(...args),
  find: (...args) => global.useFallbackDb ? fallbackDb.users.find(...args) : MongooseUser.find(...args),
  countDocuments: (...args) => global.useFallbackDb ? fallbackDb.users.countDocuments(...args) : MongooseUser.countDocuments(...args),
  insertMany: (...args) => global.useFallbackDb ? fallbackDb.users.insertMany(...args) : MongooseUser.insertMany(...args),
};

export default UserProxy;
