import Joi from "joi";

export const appointmentValidator = Joi.object({
  doctor: Joi.string().length(24).hex().required(), // MongoDB ObjectId
  patient: Joi.string().length(24).hex().required(),

  date: Joi.date().greater("now").required(),

  slot: Joi.string()
    .pattern(/^(?:[01]\d|2[0-3]):[0-5]\d-(?:[01]\d|2[0-3]):[0-5]\d$/) // strict 24h format
    .required(),

  status: Joi.string()
    .valid("pending", "confirmed", "cancelled", "completed")
    .default("pending"),
});
