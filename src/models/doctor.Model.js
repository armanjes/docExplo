import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    specialization: { type: String, required: true, trim: true },
    qualifications: { type: [String], default: [] },
    experience: { type: Number, min: 0, default: 0 },
    consultationFee: { type: Number, required: true },
    clinicName: { type: String, trim: true },
    clinicAddress: { type: String, trim: true },
    bio: { type: String, maxlength: 500, trim: true },
    schedule: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          required: true,
        },
        slots: [
          {
            start: { type: String, match: [/^\d{2}:\d{2}$/], required: true },
            end: { type: String, match: [/^\d{2}:\d{2}$/], required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
