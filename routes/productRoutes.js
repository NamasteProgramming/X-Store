const express = require('express')
const router = express.Router()
const flasherMiddleware = require('../middlewares/flasherMiddleware')
const { getProducts } = require('../modules/product/services/productService')
const { getCategories } = require('../modules/category/services/categoryService')

/**
 * Shows page for add product page
 */
router.get('/product/create', flasherMiddleware, async (req, res) => {
  const categories = await getCategories()
  return res.render('product/create', {
    categories
  })
})

/**
 * Shows product list
 */
router.get('/product', flasherMiddleware, async (req, res) => {
  const { categories: products, meta } = await getProducts({})
  return res.render('product/list', { products, meta })
})

module.exports = router
