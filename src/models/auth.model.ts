import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
