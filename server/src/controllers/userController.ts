import { Request, Response } from "express";
import User from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// define the custom request type
interface CustomRequest extends Request {
  id?: string;
}

//register User
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Please provide all the required information.",
        error: true,
      });
    }
    const user = await User.findOne({email});
    if (user) {
      return res.status(409).json({
        message: "User already exists",
        error: true,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};

//login User
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({
        message: "Please provide email and password.",
        error: true,
      });
    }
    const user = await User.findOne({email});
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid credentials", error: true });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", error: true });
    }
    //generate token

    const tokenPayload = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenPayload, process.env.JWT_KEY!, {
      expiresIn: "14d",
    });
    res.cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true, 
      sameSite: "strict", 
     });

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};

//get user details
export const userDetails = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.id) {
      return res.status(401).json({ message: "Unauthorized", error: true });
    }
    const user = await User.findById(req.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found", logout: true });
    }

    return res.status(200).json({
      user,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};

//logout User
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};


