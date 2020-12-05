const Joi = require('joi')

const createCategorySchema = Joi.object({
  categoryId: Joi.string().optional(),
  name: Joi.string().min(2).max(32).required(),
  isLeaf: Joi.boolean().required(),
  description: Joi.string().required(),
  seoDescription: Joi.string().max(160).optional(),

  thumbnail: Joi.object().keys({
    path: Joi.string().required(),
    driver: Joi.string().required()
  }).optional(),

  properties: Joi.array().items(Joi.object().keys({
    required: Joi.boolean().required(),
    name: Joi.string().required(),
    filterable: Joi.boolean().required(),

    input: Joi.object().keys({
      type: Joi.string().required(),
      propertyChoices: Joi.array().items(Joi.object().keys({
        label: Joi.string().required(),
        value: Joi.string().required()
      })).required()
        .when('type', {
          is: Joi.string().valid('selectOne', 'selectMultiple'),
          then: Joi.array().min(1)
        })
    }),

    hasUnits: Joi.boolean().required(),
    units: Joi.array().items(Joi.object().keys({
      label: Joi.string().required(),
      printLabel: Joi.string().required(),
      threshold: Joi.number().optional(),
      nextLabel: Joi.string().optional()
    })).required()
      .when('hasUnits', {
        is: true,
        then: Joi.array().min(1)
      }),

    // Filterable
    // SelectOne / SelectMultiple
    filterChoices: Joi.array().items(Joi.object().keys({
      label: Joi.string().required(),
      value: Joi.string().required(),
      type: Joi.string().required()
    })).required() // filterchoices
  })).required() // properties
})

module.exports = { createCategorySchema }
