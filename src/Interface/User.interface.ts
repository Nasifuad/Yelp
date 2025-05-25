import { Document } from "mongoose";

export interface IAuth extends Document {
  userName: string;
  userEmail: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
  generateToken(): string;
}
