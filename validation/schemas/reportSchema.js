import Joi from 'joi';

export const createReportSchema = Joi.object({
  text: Joi.string().required().messages({
    'string.empty': 'Report text cannot be empty',
    'any.required': 'Report text is required',
  }),

  category: Joi.string().required().messages({
    'string.empty': 'Report category cannot be empty',
    'any.required': 'Report category is required',
  }),

  location: Joi.string().required().messages({
    'string.empty': 'Report location cannot be empty',
    'any.required': 'Report location is required',
  }),

})