const Joi = require('joi')

const createProductSchema = Joi.object({
  categoryId: Joi.string().optional(),
  name: Joi.string().min(2).max(32).required(),
  description: Joi.string().required(),
  seoDescription: Joi.string().max(160).optional(),

  thumbnail: Joi.object().keys({
    path: Joi.string().required(),
    driver: Joi.string().required()
  }).optional()
})

module.exports = { createProductSchema }
