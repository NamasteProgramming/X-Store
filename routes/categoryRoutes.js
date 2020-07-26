const express = require('express')
const router = express.Router()
const flasherMiddleware = require('../middlewares/flasherMiddleware')
const { getNonLeafCategories } = require('../modules/category/services/categoryService')
/**
 * Shows page for add category page
 */
router.get('/category/create', flasherMiddleware, async (req, res) => {
  const categories = await getNonLeafCategories()
  return res.render('category/create', { categories })
})

module.exports = router
