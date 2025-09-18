import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
      trim: true,
    },
    specialization: { type: String, required: true, trim: true },
    consultationFee: { type: Number, required: true },
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
