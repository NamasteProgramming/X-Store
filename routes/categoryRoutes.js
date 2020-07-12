const express = require('express')
const router = express.Router()
const { addCategory } = require('../modules/category/services/categoryService')
const { createCategorySchema } = require('../modules/category/validations/categoryValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')
// const authMiddleware = require('../middlewares/authMiddleware')
const flasherMiddleware = require('../middlewares/flasherMiddleware')

/**
 * Shows page for add category page
 */
router.get('/category/create', flasherMiddleware, (req, res) => {
  return res.render('category/create')
})

/**
 * Handles user registration
 */
router.post('/category', async (req, res) => {
  try {
    const validationResult = createCategorySchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Validation Errors'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      }
      return res.redirect('/category')
    }
    await addCategory(req.body)
    req.session.flashData = {
      message: {
        type: 'success',
        body: 'Category added successfully'
      }
    }
    return res.redirect('/category')
  } catch (e) {
    req.session.flashData = {
      message: {
        type: 'error',
        body: 'Validation Errors'
      },
      errors: mongooseErrorFormatter(e),
      formData: req.body
    }
    return res.redirect('/category')
  }
})

module.exports = router
