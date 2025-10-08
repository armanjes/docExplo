import mongoose from "mongoose";
import { Account } from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  
  const profileImage = req.file;

  if (!name || !email || !password) {
    return res.status(400).json({
      ok: false,
      message: "Please provide name, email, and password.",
    });
  }

  try {
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({
        ok: false,
        message: "Email already exists!",
      });
    }

    const account = await Account.create({
      name,
      email,
      password: password, // Change this to the hashed password
      profileImage: profileImage?.path || null, // Use optional chaining to safely access the path
    });

    generateToken(account._id, account.role, res);

    const user = {
      name: account.name,
      email: account.email,
      role: account.role,
    };

    res.status(201).json({
      ok: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    // Log the full error for debugging
    console.error("Registration Error:", err);
    // Return a 500 status code for a server-side error
    res.status(500).json({
      ok: false,
      message: "Server error during registration.",
      error: err.message,
    });
  }
};

// @desc    Login user (any role)
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;
  

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: "Empty fields!" });
  }

  try {
    const account = await Account.findOne({ email }).select("+password");
    console.log("account: ", account);

    if (!account) {
      return res.status(400).json({ ok: false, message: "Account not found!" });
    }

    // Compare password
    const isMatch = await account.comparePassword(password);
    console.log("is match ", isMatch);

    if (!isMatch) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid credentials!" });
    }

    // response account
    generateToken(account._id, account.role, res);

    let user = {
      name: account.name,
      email: account.email,
      role: account.role,
      profile: account.profile || null,
      profileImage: account.profileImage || null,
    };

    // Populate profile for Doctor and Patient
    // if (account.role === "Doctor") {
    //   const doctorProfile = await Doctor.findOne({ account: account._id });
    //   return res.status(200).json({
    //     ok: true,
    //     message: `${account.role} Login successful`,
    //     responseAccount: {
    //       id: doctorProfile._id,
    //       email: doctorProfile.email,
    //       profile: doctorProfile.profile || null,
    //       profileImage: doctorProfile.profileImage || null,
    //       role: account.role,
    //     },
    //   });
    // }

    return res.status(200).json({
      ok: true,
      message: `${account.role} Login successful`,
      user,
    });
  } catch (err) {
    return res.status(400).json({ ok: false, message: err.message });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  loggedin users
export const logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token").json({ ok: true, message: "Logout successful" });
  } catch (err) {
    return res.status(400).json({ ok: false, message: err.message });
  }
};

// @desc    update user
// @route   PATCH /api/auth/:id
// @access  protected
export const updateAccount = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ ok: false, message: "User not found." });

  if (req.user._id !== id) {
    console.log("user id: ", req.user._id);
    console.log("user id: ", typeof req.user._id);
    console.log("id: ", typeof id);

    return res
      .status(403)
      .json({ ok: false, message: "Not authorized to update this account." });
  }

  try {
    if (req.file) {
      req.body.profileImage = req.file.path;
    }

    const user = await Account.findByIdAndUpdate(id, req.body, { new: true });

    if (!user)
      return res.status(404).json({ ok: false, message: "Invalid user ID." });

    res.status(200).json({ ok: true, message: "user updated", user });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// @desc    delete user
// @route   PATCH /api/auth/:id
// @access  protected
export const deleteAccount = async (req, res) => {
  const { _id } = req.user;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ ok: false, message: "User not found." });
  }

  if (req.user._id !== _id) {
    return res
      .status(403)
      .json({ ok: false, message: "Not authorized to delete this account." });
  }

  try {
    const user = await Account.findByIdAndDelete(_id);

    if (!user)
      return res.status(404).json({ ok: false, message: "Invalid user ID." });
    res
      .status(200)
      .clearCookie("token")
      .json({ ok: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// @desc    
// @route   
// @access  
export const profile = async (req, res) => {
  try {
    const account = await Account.findById(req.user._id).select("-password");
    const user = {
      name: account.name,
      email: account.email,
      role: account.role,
    };
    return res.status(200).json({ ok: true, user });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};
