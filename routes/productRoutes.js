const express = require('express')
const router = express.Router()
const flasherMiddleware = require('../middlewares/flasherMiddleware')
const { getNonLeafCategories, getCategories } = require('../modules/category/services/categoryService')
const { inputTypeOptions, filterTypeOptions } = require('../modules/category/constants/constants')

/**
 * Shows page for add category page
 */
router.get('/category/create', flasherMiddleware, async (req, res) => {
  const categories = await getNonLeafCategories()
  return res.render('category/create', {
    categories,
    inputTypeOptions,
    filterTypeOptions
  })
})

/**
 * Shows product list
 */
router.get('/product', flasherMiddleware, async (req, res) => {
  const { categories, meta } = await getCategories({})
  return res.render('product/list', { categories, meta })
})

module.exports = router
