import Joi from "joi";

// validate doctor registration
export const doctorRegisterValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().trim().min(3).max(15),
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required(),
    role: Joi.string().valid("admin", "doctor").default("doctor").required(),
    profileImage: Joi.string().uri().optional().allow(null),
    specialization: Joi.string().trim().required(),
    consultationFee: Joi.number().required().min(700).max(5000),
    schedule: Joi.array().items(
      Joi.object({
        day: Joi.string()
          .valid(
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          )
          .required(),
        slots: Joi.array().items({
          start: Joi.string()
            .pattern(/^([01]\d|2[0-3]):[0-5]\d$/)
            .required(), // HH:MM
          end: Joi.string()
            .pattern(/^([01]\d|2[0-3]):[0-5]\d$/)
            .required(),
        }),
      })
    ),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
