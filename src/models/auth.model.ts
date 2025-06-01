import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IAuth } from "../Interface/User.interface";
const userSchema = new mongoose.Schema<IAuth>({
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
  avatar: {
    type: String,
    default:
      "https://www.vecteezy.com/vector-art/9292244-default-avatar-icon-vector-of-social-media-user",
  },
});

userSchema.pre("save", async function (this: IAuth, next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (
  this: IAuth,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IAuth>("User", userSchema);
export default User;
