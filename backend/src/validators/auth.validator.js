import Joi from "joi";

export const registerValidator = Joi.object({
  name: Joi.string().min(3).max(15).required().trim(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
  role: Joi.string().valid("admin", "doctor", "patient").default("patient"),
  profileImage: Joi.string().uri().optional(),
});

// login validator
export const loginValidator = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});
