import Joi from "joi";

export const patientValidator = Joi.object({
  dateOfBirth: Joi.date()
    .less("now")
    .greater("1-1-1900") // sanity check
    .optional(),

  gender: Joi.string().valid("male", "female", "other").required(),

  medicalHistory: Joi.array()
    .items(Joi.string().max(200)) // prevent huge notes
    .max(50), // max 50 history entries
});
