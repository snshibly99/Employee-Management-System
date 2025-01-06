import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, error: "Wrong Password" });
    }

    const today = new Date();
    const lastLoginDate = user.lastLoginDate;

    if (!lastLoginDate || lastLoginDate.toDateString() !== today.toDateString()) {
        user.attendance += 1;
        user.lastLoginDate = today;
    } 
    user.status = "online";
    await user.save();


    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    return res
      .status(200)
      .json({
        success: true, 
        token,
        user: { _id: user._id, name: user.name, role: user.role, status: user.status, attendance: user.attendance },
      });
  } catch (error) {
    res.status(500).json({success: false, error: error.message})
  }
};

const logout = async (req, res) => {
  try {
    const user = req.user;
    user.status = "offline";
    await user.save();

    return res.status(200).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const verify = (req, res) =>{
    return res.status(200).json({success: true, user: req.user})
}

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};



export { login, verify, getUsers, logout };
