import Joi from 'joi';
import { ACCEPTABLE_STATES } from '../../utils/enums.js';

export const createLocationSchema = Joi.object({
  city: Joi.string().required().insensitive().messages({
    'string.empty': 'City cannot be empty',
    'any.required': 'City is required',
  }),

  street: Joi.string().required().messages({
    'string.empty': 'Street cannot be empty',
    'any.required': 'Street is required',
  }),

  state: Joi.string().valid(...ACCEPTABLE_STATES).required().insensitive().messages({
    'string.empty': 'State cannot be empty',
    'any.required': 'State is required',
    'array.base':"State must be a string in the array of valid states"
  }),

})


