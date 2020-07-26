const express = require('express')
const router = express.Router()
const { addCategory } = require('../../modules/category/services/categoryService')
const { createCategorySchema } = require('../../modules/category/validations/categoryValidation')
const { joiErrorFormatter /* mongooseErrorFormatter */ } = require('../../utils/validationFormatter')

router.post('/', async (req, res) => {
  const validationResult = createCategorySchema.validate(req.body, {
    abortEarly: false
  })

  if (validationResult.error) {
    const processedErrors = joiErrorFormatter(validationResult.error)
    return res.status(422).json({
      errors: processedErrors
    })
  }
  const category = await addCategory(req.body)
  return res.json(category)
})

module.exports = router
