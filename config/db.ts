import mongoose from "mongoose";
import config from "./config";

const connectDB = async (): Promise<void> => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(config.MONGO_URI);
    console.log("✅ Database connected", config.MONGO_URI);
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    throw error;
  }
};

export default connectDB;
