import { generateToken } from "../utils/token";
import User from "../models/auth.model";
import { Request, response, Response } from "express";

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
      const token = generateToken(user.userName);
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
const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userName, password } = req.body;

    const checkUser = await User.findOne({ userName });

    if (!checkUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password (await the Promise)
    const isMatch = await checkUser.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token using instance method
    const token = generateToken(userName);

    res.cookie("token", token);
    console.log(token);
    res.json({
      message: "Login successful",
      token,
      response: 200,
      user: checkUser,
    });
  } catch (error) {
    console.log("Error occured at login controller", error);
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error occured at logout controller", error);
  }
};

const authenticate = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  res.json({
    message: "Logged User",
    response: 200,
    user: user,
  });
};
export { signUp, login, logout, authenticate };
