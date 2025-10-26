import Joi from 'joi';
const ACCEPTABLE_CATEGORIES = [
  'Domestic Violence', 'Cyber Harassment', 'Fraud/Scam', 'Sexual Harassment', 'Child Abuse', 'Missing Persons'
]
export const createReportSchema = Joi.object({
  text: Joi.string().required().messages({
    'string.empty': 'Report text cannot be empty',
    'any.required': 'Report text is required',
  }),

  category: Joi.string().required().valid(...ACCEPTABLE_CATEGORIES)
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