import { Account, Doctor } from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";

// =========================
// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
// =========================
export const register = async (req, res) => {
  const { name, email, password } = req.body;
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

    res.status(201).json({
      ok: true,
      message: "User registered successfully",
      account: {
        _id: account._id,
        name: account.name,
        email: account.email,
        profileImage: account.profileImage,
      },
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

// =========================
// @desc    Login user (any role)
// @route   POST /api/auth/login
// @access  Public
// =========================
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: "Empty fields!" });
  }

  try {
    const account = await Account.findOne({ email }).select("+password");

    if (!account) {
      return res.status(400).json({ ok: false, message: "Account not found!" });
    }

    // Compare password
    const isMatch = await account.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid credentials!" });
    }

    // response account
    generateToken(account.role, account._id, res);

    let responseAccount = {
      id: account._id,
      email: account.email,
      role: account.role,
      profile: account.profile || null,
      profileImage: account.profileImage || null,
    };

    // Populate profile for Doctor and Patient
    if (account.role === "Doctor") {
      const doctorProfile = await Doctor.findOne({ account: account._id });
      res.status(200).json({
        ok: true,
        message: `${account.role} Login successful`,
        responseAccount: {
          id: doctorProfile._id,
          email: doctorProfile.email,
          profile: doctorProfile.profile || null,
          profileImage: doctorProfile.profileImage || null,
          role: account.role,
        },
      });
    }

    res.status(200).json({
      ok: true,
      message: `${account.role} Login successful`,
      account: responseAccount,
    });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// =========================
// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
// =========================
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ ok: true, message: "Logout successful" });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};
