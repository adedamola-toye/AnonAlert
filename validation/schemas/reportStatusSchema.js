import Joi from 'joi';
const ACCEPTABLE_STATUS = [
    'pending', 'in-review', 'resolved', 'flagged'
]
export const updateReportStatusSchema = Joi.object({
  status: Joi.string().required().valid(...ACCEPTABLE_STATUS)
    .messages({
      'string.empty': 'Status cannot be empty',
      'any.required': 'Status is required',
      'any.only': 'Status must be one of the acceptable options.'
    }),
})