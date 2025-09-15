import mongoose from "mongoose";
import { Doctor, User } from "../models/index.js";

export const createDoctor = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    profileImage,
    specialization,
    qualifications,
    experience,
    consultationFee,
    clinicName,
    clinicAddress,
    bio,
    schedule,
  } = req.body;

  // const requiredFields = [
  //   name,
  //   email,
  //   password,
  //   role,
  //   profileImage,
  //   specialization,
  //   qualifications,
  //   experience,
  //   consultationFee,
  //   clinicName,
  //   clinicAddress,
  //   bio,
  //   schedule,
  // ];

  // const missingField = requiredFields.find((field) => !req.body[field]);

  // if (missingField)
  //   return res.status(400).json({
  //     ok: false,
  //     message: `Please provide all fields! Missing: ${missingField}`,
  //   });

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ ok: false, message: "Email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      profileImage,
    });

    const doctor = await Doctor.create({
      user: user._id,
      specialization,
      qualifications,
      experience,
      consultationFee,
      clinicName,
      clinicAddress,
      bio,
      schedule,
    });

    return res.status(201).json({ ok: true, doctor });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

export const updateDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ ok: false, message: "Doctor not found." });
  try {
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(200)
      .json({ ok: true, message: "Doctor updated!", doctor });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
};

export const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({
      ok: false,
      message: "Doctor not found.",
    });

  try {
    const doctor = await Doctor.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ ok: true, message: "Doctor deleted successfully!", doctor });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: err.message,
    });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ ok: true, doctors });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Not found!" });
  }
};

export const getDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ ok: false, message: "Doctor not found!" });

  try {
    const doctor = await Doctor.findById(id);
    res.status(200).json({ ok: true, doctor });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Not found!" });
  }
};
