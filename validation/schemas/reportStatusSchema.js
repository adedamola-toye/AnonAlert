import Joi from 'joi';
import { ACCEPTABLE_STATUS } from '../../utils/enums.js';
export const updateReportStatusSchema = Joi.object({
  newStatus: Joi.string().required().valid(...ACCEPTABLE_STATUS)
    .messages({
      'string.empty': 'New status cannot be empty',
      'any.required': 'New status is required',
      'any.only': 'New status must be one of the acceptable options.'
    }),
})