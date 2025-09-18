import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const accountSchema = mongoose.Schema(
  {
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
    profile: { type: mongoose.Schema.Types.ObjectId, refPath: "role" },
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

// Hide sensitive data in JSON
accountSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const Account = mongoose.model("Account", accountSchema);
