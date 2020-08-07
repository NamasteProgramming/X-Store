const express = require('express')
const router = express.Router()
const { addCategory, getCategories, destoryCategory } = require('../../modules/category/services/categoryService')
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
  try {
    const category = await addCategory(req.body)
    return res.json(category)
  } catch (e) {
    // TODO: Temporary
    return res.status(422).json(e)
  }
})

router.get('/', async (req, res) => {
  const { pageNo = 1, pageSize = 10 } = req.query
  const { categories, meta } = await getCategories({ pageNo, pageSize })
  return res.status(206).json({
    categories, meta
  })
})

router.delete('/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId
  const result = await destoryCategory({ categoryId })
  return res.status(200).json({
    result
  })
})

module.exports = router
