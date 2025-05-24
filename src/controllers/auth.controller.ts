import { generateToken } from "../utils/ token";
import User from "../models/auth.model";
import { Request, Response } from "express";

const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password, userEmail } = req.body;
    console.log(userName, password, userEmail);
    if (!userName || !password || !userEmail) {
      res.status(400).json({ message: "All fields are required" });
    }
    const checkUser = await User.findOne({ userName });
    if (checkUser) {
      res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      userName,
      password,
      userEmail,
    });
    if (user) {
      const token = generateToken(user._id, user.userName);
      res.cookie("token", token);
      res.json({
        message: "User created successfully",
        token: token,
        status: 200,
        user: user,
      });
    }
  } catch (error) {
    console.log("Error occured at signUp controller", error);
  }
};

export { signUp };
