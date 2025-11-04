import Joi from 'joi';
import {ACCEPTABLE_CATEGORIES} from "../../utils/enums.js"

export const createReportSchema = Joi.object({
  text: Joi.string().required().messages({
    'string.empty': 'Report text cannot be empty',
    'any.required': 'Report text is required',
  }),

  category: Joi.string().required().valid(...ACCEPTABLE_CATEGORIES).insensitive()
  .messages({
    'string.empty': 'Report category cannot be empty',
    'any.required': 'Report category is required',
    'any.only': 'Category must be one of the acceptable options.'
  }),

  location: Joi.string().required().messages({
    'string.empty': 'Report location cannot be empty',
    'any.required': 'Report location is required',
  }),

})