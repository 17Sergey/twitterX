import { generateTokenAndSetCookie } from "../lib/utils/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import brypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Invalid email format" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ error: "User email is already taken" });
    } 

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ error: "Username is already taken" });
    } 

    const salt = await brypt.genSalt(10);
    const hashedPassword = brypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    }
    else {
      res.status(400).json({ error: "Invalid user data" });
    }

  } catch (error) {
    console.log(`Error in signup controller ${error}`);
    res.status(500); // Server error
  }
};

export const login = async (req, res) => {
  res.json({
    data: "Login endpoint",
  });
};

export const logout = async (req, res) => {
  res.json({
    data: "Logout endpoint",
  });
};
