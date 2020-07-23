const express = require('express')
const router = express.Router()
const { addCategory } = require('../../modules/category/services/categoryService')

router.post('/', async (req, res) => {
  const category = await addCategory(req.body)
  res.json(category)
})

module.exports = router
