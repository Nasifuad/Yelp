import mongoose from "mongoose";
import config from "./config";

const connectDB = () => {
  try {
    console.log(config.MONGO_URI);
    console.log(config);
    mongoose.connect(config.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("error connecting the database", error);
  }
};
export default connectDB;
