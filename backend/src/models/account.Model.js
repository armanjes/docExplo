import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const accountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    password: { type: String, required: true, minlength: 6, select: false },
    role: {
      type: String,
      enum: ["Admin", "Doctor", "Patient"],
      default: "Patient",
    },
    profileImage: { type: String, default: null },
  },
  { timestamps: true }
);

// Hash password before save
accountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
accountSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Account = mongoose.model("Account", accountSchema);
