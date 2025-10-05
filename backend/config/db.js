
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      maxPoolSize: 20,   // Maximum 20 concurrent connections
      minPoolSize: 5,    // At least 5 connections hamesha open rahenge
      serverSelectionTimeoutMS: 5000, // 5 sec me retry karega
      socketTimeoutMS: 45000,         // 45 sec tak socket wait karega
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    // Retry after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
