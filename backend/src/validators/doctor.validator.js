import Joi from "joi";

// validate doctor registration
export const doctorRegisterValidator = Joi.object({
  // Account fields
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
  role: Joi.string().valid("Admin", "Doctor", "Patient").default("Doctor"),
  profileImage: Joi.string().uri().optional(),

  // Doctor-specific fields

  specialization: Joi.string().trim().required(),
  consultationFee: Joi.number().min(700).max(5000).required(),
  schedule: Joi.array()
    .items(
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
        slots: Joi.array()
          .items(
            Joi.object({
              start: Joi.string()
                .pattern(/^([01]\d|2[0-3]):[0-5]\d$/)
                .required(),
              end: Joi.string()
                .pattern(/^([01]\d|2[0-3]):[0-5]\d$/)
                .required(),
            })
          )
          .required(),
      })
    )
    .required(),
});
