import Joi from "joi";

export const doctorValidator = (req, res, next) => {
  const schema = Joi.object({
    specialization: Joi.string().min(3).max(100).required(),

    experience: Joi.number()
      .min(0)
      .max(60) // sensible cap
      .default(0),

    consultationFee: Joi.number()
      .min(1000)
      .max(10000) // prevent insane values
      .required(),

    availability: Joi.array()
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
          slots: Joi.array().items(
            Joi.object({
              start: Joi.string()
                .pattern(/^([01]\d|2[0-3]):[0-5]\d$/)
                .required(), // HH:MM
              end: Joi.string()
                .pattern(/^([01]\d|2[0-3]):[0-5]\d$/)
                .required(),
            })
          ),
        })
      )
      .max(7) // max 7 days
      .required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
