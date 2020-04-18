const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')
const passport = require('passport')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const flasherMiddleware = require('../middlewares/flasherMiddleware')

/**
 * Shows page for user registration
 */
router.get('/register', guestMiddleware, flasherMiddleware, (req, res) => {
  return res.render('register')
})

/**
 * Handles user registration
 */
router.post('/register', guestMiddleware, async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
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
      return res.redirect('/register')
    }
    await addUser(req.body)
    req.session.flashData = {
      message: {
        type: 'success',
        body: 'Registration success'
      }
    }
    return res.redirect('/register')
  } catch (e) {
    req.session.flashData = {
      message: {
        type: 'error',
        body: 'Validation Errors'
      },
      errors: mongooseErrorFormatter(e),
      formData: req.body
    }
    return res.redirect('/register')
  }
})

/**
 * Shows page for user login
 */
router.get('/login', guestMiddleware, flasherMiddleware, (req, res) => {
  return res.render('login')
})

/**
 * Logs in a user
 */
router.post('/login', guestMiddleware, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

/**
 * Logs out a user
 */
router.get('/logout', authMiddleware, (req, res) => {
  req.logout()
  req.session.flashData = {
    message: {
      type: 'success',
      body: 'Logout success'
    }
  }
  return res.redirect('/')
})

module.exports = router
