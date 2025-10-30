import Joi from 'joi';
const ACCEPTABLE_CATEGORIES = [
  'Domestic Violence', 'Cyber Harassment', 'Fraud/Scam', 'Sexual Harassment', 'Child Abuse', 'Missing Persons'
]
const ACCEPTABLE_STATES =  [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara"
];


export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),

  password: Joi.string()
    .required()
    .min(8)
    .max(30)
    .pattern(/[A-Z]/, { name: 'uppercase character' })
    .pattern(/[a-z]/, { name: 'lowercase character' })
    .pattern(/[0-9]/, { name: 'number' })
    .pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { name: 'special-character' })
    .messages({
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required',
      'string.min': 'Password must have a minimum of 8 characters',
      'string.max': 'Password must have a maximum of 30 characters',
      'string.pattern.name': 'Password must include at least one {#name}', 
    }),

  name: Joi.string().required().messages({
    'string.empty': 'Organization name cannot be empty',
    'any.required': 'Organization name is required',
  }),

  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'string.empty': 'Confirm password cannot be empty',
      'any.required': 'Confirm password is required',
      'any.only':"Confirm password does not match password"
    }),

    phoneNo: Joi.string().pattern(/^[0-9]{11}$/).required().messages({
  'string.empty': 'Phone number is required',
  'string.pattern.base': 'Phone number must be 11 digits',
}),


    categoriesHandled: Joi.string().required().valid(...ACCEPTABLE_CATEGORIES)
    .messages({
      'string.empty': 'Categories handled cannot be empty',
      'any.required': 'Categories handled  is required',
      'any.only': 'Categories handled must be one of the acceptable options.'
    }),
    statesCovered: Joi.string().required().valid(...ACCEPTABLE_STATES)
    .messages({
      'string.empty': 'States covered cannot be empty',
      'any.required': 'States covered  is required',
      'any.only': 'States covered must be one of the acceptable options.'
    }),
    
    
})
.prefs({ abortEarly: false }); 




export const loginSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Organization name cannot be empty',
    'any.required': 'Organization name is required',
  }),

  password: Joi.string().required().messages({
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
})
.prefs({ abortEarly: false }); 


//Logout schema


