const express = require('express')
const router = express.Router()
const flasherMiddleware = require('../middlewares/flasherMiddleware')
const { getNonLeafCategories, getCategories } = require('../modules/category/services/categoryService')

/**
 * Shows page for add category page
 */
router.get('/category/create', flasherMiddleware, async (req, res) => {
  const categories = await getNonLeafCategories()
  return res.render('category/create', { categories })
})

/**
 * Shows category list
 */
router.get('/category', flasherMiddleware, async (req, res) => {
  const { categories, meta } = await getCategories({})
  return res.render('category/list', { categories, meta })
})

module.exports = router
