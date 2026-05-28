import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    global.useFallbackDb = false;
  } catch (error) {
    console.warn(`MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ MongoDB server is not running or accessible. Falling back to the zero-config local JSON database adapter.');
    global.useFallbackDb = true;
  }
};

export default connectDB;
