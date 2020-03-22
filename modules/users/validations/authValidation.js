const Joi = require('@hapi/joi')

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(64)
    .required(),

  password: Joi.string()
    .required(),

  repeat_password: Joi.ref('password'),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
})
  .with('password', 'repeat_password')

module.exports = { registerSchema }
