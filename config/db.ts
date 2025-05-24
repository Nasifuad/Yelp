import mongoose from "mongoose";
import config from "./config";

const connectDB = async (): Promise<void> => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(config.MONGO_URI);
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    throw error; // Let the caller (main file) handle it
  }
};

export default connectDB;
