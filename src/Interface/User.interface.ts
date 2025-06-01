import { Document } from "mongoose";

export interface IAuth extends Document {
  userName: string;
  userEmail: string;
  password: string;
  avatar?: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface IJournal extends Document {
  title: string;
  body: string;
  author: string;
  tags: string[];
  createdAt: Date;
}
