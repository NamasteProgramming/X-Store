const express = require('express')
const router = express.Router()
const flasherMiddleware = require('../middlewares/flasherMiddleware')

/**
 * Shows page for add category page
 */
router.get('/category/create', flasherMiddleware, (req, res) => {
  return res.render('category/create')
})

module.exports = router
