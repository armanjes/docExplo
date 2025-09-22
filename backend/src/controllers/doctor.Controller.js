import mongoose from "mongoose";
import { Account, Doctor } from "../models/index.js";

// =========================
// @desc    Create new doctor
// @route   POST /api/doctors/
// @access  Admin only
// =========================
export const createDoctor = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    specialization,
    consultationFee,
    schedule,
  } = req.body;
  const profileImage = req.file;

  try {
    // Check if email already exists
    const existingUser = await Account.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ ok: false, message: "Email already exists" });
    }

    // Create doctor profile
    const doctorAccount = await Account.create({
      name,
      email,
      password,
      role: "Doctor",
      profileImage: profileImage?.path || null,
    });

    // Create account for doctor
    const doctorProfile = await Doctor.create({
      account: doctorAccount._id,
      specialization,
      consultationFee,
      schedule,
    });

    const account = {
      name: doctorAccount.name,
      email: doctorAccount.email,
      role: doctorAccount.role,
      profileImage: doctorAccount.profileImage,
      specialization: doctorProfile.specialization,
      consultationFee: doctorProfile.consultationFee,
      schedule: doctorProfile.schedule,
    };

    // Return safe fields only
    res.status(201).json({
      ok: true,
      message: "Doctor created successfully",
      account,
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// =========================
// @desc    Update a doctor
// @route   PUT /api/doctors/:id
// @access  Admin only
// =========================
export const updateDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ ok: false, message: "Doctor not found." });

  try {
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
    if (!doctor)
      return res.status(404).json({ ok: false, message: "Invalid doctor ID." });

    res.status(200).json({ ok: true, message: "Doctor updated", doctor });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// =========================
// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Admin only
// =========================
export const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  console.log("user id: ", id);
  

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ ok: false, message: "Doctor not found." });

  try {
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor)
      return res.status(404).json({ ok: false, message: "Invalid doctor ID." });

    // Optionally: delete corresponding account
    await Account.findOneAndDelete({ profile: doctor._id });

    res
      .status(200)
      .json({ ok: true, message: "Doctor deleted successfully", doctor });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// =========================
// @desc    Get all doctors
// @route   GET /api/doctors/
// @access  Public
// =========================
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ ok: true, doctors });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// =========================
// @desc    Get a specific doctor
// @route   GET /api/doctors/:id
// @access  Public
// =========================
export const getDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ ok: false, message: "Invalid doctor ID." });

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor)
      return res.status(404).json({ ok: false, message: "Doctor not found" });

    res.status(200).json({ ok: true, doctor });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
