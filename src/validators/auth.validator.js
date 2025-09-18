import Joi from "joi";

export const registerValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required().trim(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required(),
    role: Joi.string().valid("admin", "doctor", "patient").default("patient"),
    profileImage: Joi.string().uri().optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
