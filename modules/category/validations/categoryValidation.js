const Joi = require('@hapi/joi')

const choiceSchema = Joi.object().keys({
  label: Joi.string().required(),
  value: Joi.any().required()
})

const createCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(32)
    .required(),

  description: Joi.string()
    .required(),

  seoDescription: Joi.string()
    .max(160)
    .optional(),

  thumbnail: Joi.string().optional(),

  filters: Joi.array().items({
    name: Joi.string().required(),
    choices: Joi.array().items(choiceSchema),
    required: Joi.boolean().required(),
    input: Joi.object().keys({
      type: Joi.string().required(),
      choices: Joi.array().items(choiceSchema)
    })
  })
})

module.exports = { createCategorySchema }
