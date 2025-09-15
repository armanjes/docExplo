import { User } from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const email = await User.findOne({ email: req.body.email });

    if (email)
      return res
        .status(400)
        .json({ ok: false, message: "email already exists!" });

    const user = await User.create(req.body);
    generateToken(user, res);
    res.status(201).json({ ok: true, message: "user created!", user });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: "false", message: "Empty fields!" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid credentials!" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid credentials!" });
    }

    generateToken(user, res);
    return res
      .status(200)
      .json({ ok: true, message: "login successful", role: user.role });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json("Logout successfull");
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};
