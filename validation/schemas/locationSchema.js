import Joi from 'joi';

export const createLocationSchema = Joi.object({
  city: Joi.string().required().messages({
    'string.empty': 'City cannot be empty',
    'any.required': 'City is required',
  }),

  street: Joi.string().required().messages({
    'string.empty': 'Street cannot be empty',
    'any.required': 'Street is required',
  }),

})