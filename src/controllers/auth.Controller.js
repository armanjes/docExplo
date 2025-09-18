import { Account, User, Doctor } from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";

// =========================
// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
// =========================
export const register = async (req, res) => {
  const { name, email, password, profileImage } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ ok: false, message: "Please provide name, email, and password" });
  }

  try {
    // Check if account already exists
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res
        .status(400)
        .json({ ok: false, message: "Email already exists!" });
    }

    // Create user profile
    const userProfile = await User.create({ name });

    // Create account
    const userAccount = await Account.create({
      email,
      password,
      profileImage: profileImage || null,
      profile: userProfile._id,
      role: "Patient", // default role
    });

    // Generate JWT
    generateToken(userAccount, res);

    res.status(201).json({
      ok: true,
      message: "User registered successfully",
      account: {
        id: userAccount._id,
        email: userAccount.email,
        role: userAccount.role,
        profile: userProfile,
      },
    });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
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

    // Populate profile for Doctor and Patient
    if (account.role !== "Admin") {
      const modelMap = { Doctor: "Doctor", Patient: "User" };
      await account.populate({
        path: "profile",
        model: modelMap[account.role],
      });
    }

    // Generate JWT
    generateToken(account, res);

    res.status(200).json({
      ok: true,
      message: "Login successful",
      account: {
        id: account._id,
        email: account.email,
        role: account.role,
        profile: account.profile || null,
        profileImage: account.profileImage || null,
      },
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
