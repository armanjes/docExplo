import Joi from "joi";

export const accountValidator = {
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
  role: Joi.string().valid("admin", "doctor", "patient").default("patient"),
  profileImage: Joi.string().uri().optional(),
};
