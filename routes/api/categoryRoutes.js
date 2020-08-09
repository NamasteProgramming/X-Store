const express = require('express')
const router = express.Router()
const { addCategory, getCategories, destoryCategory } = require('../../modules/category/services/categoryService')
const { createCategorySchema } = require('../../modules/category/validations/categoryValidation')
const { joiErrorFormatter /* mongooseErrorFormatter */ } = require('../../utils/validationFormatter')
const { successWrapper, errorWrapper } = require('../../utils/responseWrapper')

router.post('/', async (req, res) => {
  const validationResult = createCategorySchema.validate(req.body, {
    abortEarly: false
  })

  if (validationResult.error) {
    const processedErrors = joiErrorFormatter(validationResult.error)
    return errorWrapper({
      res,
      errors: processedErrors,
      message: 'Validation errors',
      type: 'ValidationErrors',
      status: 422
    })
  }
  try {
    const category = await addCategory(req.body)
    return successWrapper({
      res,
      status: 201,
      message: 'Category created successfully',
      data: { category }
    })
  } catch (e) {
    // TODO: Temporary
    return errorWrapper({
      res,
      errors: e,
      message: 'Validation errors',
      type: 'ValidationErrors',
      status: 422
    })
  }
})

router.get('/', async (req, res) => {
  const { pageNo = 1, pageSize = 10, keyword = '' } = req.query
  const { categories, meta } = await getCategories({ pageNo, pageSize, keyword })
  return successWrapper({
    res,
    status: 206,
    data: {
      categories, meta
    }
  })
})

router.delete('/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId
  const result = await destoryCategory({ categoryId })
  return successWrapper({
    res,
    data: {
      result
    }
  })
})

module.exports = router
