import Joi from "joi";

export const paymentValidator = Joi.object({
  appointment: Joi.string().length(24).hex().required(),

  amount: Joi.number()
    .min(1)
    .max(1000000) // sanity cap
    .required(),

  method: Joi.string().valid("card", "paypal", "bkash").required(),

  status: Joi.string()
    .valid("pending", "completed", "failed")
    .default("pending"),
});
