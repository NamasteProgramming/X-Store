const Joi = require('joi')

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(64).required(),
  password: Joi.string().max(64).required(),
  repeat_password: Joi.ref('password'),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
}).with('password', 'repeat_password')

module.exports = { registerSchema }
