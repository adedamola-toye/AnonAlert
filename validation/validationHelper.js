import Joi from "joi";

export function validateOrThrow(schema, input){
    const { error, value } = schema.validate(input, {
        abortEarly: false,
        allowUnknown: false,
      });
      if (error) {
        const errorMessages = error.details.map((detail) =>
          detail.message.replace(/['"]+/g, "")
        ).join('; ');
        const validationError = new Error(errorMessages);
        validationError.statusCode = 400;
        throw validationError;
      }
      return value;
}