const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')

/**
 * Shows page for user registration
 */
router.get('/register', (req, res) => {
  return res.render('register', { message: null })
})

/**
 * Handles user registration
 */
router.post('/register', async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      // return res.send(joiErrorFormatter(validationResult.error))
      return res.render('register', { message: 'Validation Errors' })
    }
    const user = await addUser(req.body)
    return res.render('register', { message: 'Registration success' })
  } catch (e) {
    console.error(e)
    return res.send(mongooseErrorFormatter(e))
    return res.status(400).render('register', { message: 'Something went wrong' })
  }
})

module.exports = router
