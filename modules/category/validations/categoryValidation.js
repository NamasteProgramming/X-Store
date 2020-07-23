const Joi = require('@hapi/joi')
// const { joiErrorFormatter } = require('../../../utils/validationFormatter')

const createCategorySchema = Joi.object({
  categoryId: Joi.string().optional().allow(''),
  name: Joi.string().trim().min(2).max(32).required(),
  isLeaf: Joi.boolean().required(),
  description: Joi.string().required(),
  seoDescription: Joi.string().max(160).optional(),
  thumbnail: Joi.object().keys({
    path: Joi.string().required(),
    driver: Joi.string().required()
  }),
  properties: Joi.array().items(Joi.object().keys({
    required: Joi.boolean().required(),
    name: Joi.string().required(),
    filterable: Joi.boolean().required(),
    hasUnits: Joi.boolean().required(),
    input: Joi.object().keys({
      type: Joi.string().required(),
      propertyChoices: Joi.array().items(Joi.object().keys({
        label: Joi.string().required(),
        value: Joi.string().required()
      }).when('type', {
        is: Joi.valid('selectOne', 'selectMultiple'),
        then: Joi.required()
      }))
    }),
    units: Joi.array().items(Joi.object().keys({
      label: Joi.string().required(),
      printLabel: Joi.string().required(),
      threshold: Joi.number().optional(),
      nextLabel: Joi.string().optional().allow('')
    })).when('hasUnits', { is: true, then: Joi.array().min(1).required() }),
    filterChoices: Joi.array().items(Joi.object().keys({
      label: Joi.string().required(),
      value: Joi.string().required(),
      type: Joi.string().required()
    }))
      .when(Joi.object({
        filterable: {
          is: true
        },
        input: Joi.object({
          type: {
            is: 'fractionalNumbesr'
          }
        })
      }), {
        then: Joi.array().required().min(1)
      })
  }))
})

module.exports = { createCategorySchema }
