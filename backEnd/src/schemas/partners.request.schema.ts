import Joi from "joi";

export const partnersRequestSchema = Joi.object().keys({
  distance: Joi.number().required(),
  lat: Joi.number().required().min(-90).max(90),
  lng: Joi.number().required().min(-180).max(180),
});
