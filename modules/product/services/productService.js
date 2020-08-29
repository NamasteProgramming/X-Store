const Product = require('../models/Product')
const { calculateOffset } = require('../../../utils/global')

/**
 * Create new product
 * @param {Object} productInput - Product input, validated by product validation
 * @returns {Product}
 */
const addProduct = async (productInput) => {
  const product = new Product(productInput)
  await product.save()
  return product
}

const getProducts = async ({ filters, pageNo = 1, pageSize = 10, keyword }) => {
  pageNo = parseInt(pageNo)
  pageSize = parseInt(pageSize)

  const conditions = {}
  if (keyword) {
    conditions.name = {
      $regex: keyword
    }
  }

  const [products, total] = await Promise.all([
    Product.find(conditions)
      .skip(calculateOffset({ pageNo, pageSize }))
      .limit(pageSize)
      .lean(),
    Product.countDocuments(conditions)
  ])

  const meta = {
    total,
    pageNo,
    pageSize
  }
  return {
    products,
    meta
  }
}

const destoryProduct = async ({
  productId,
  productIds
}) => {
  let result
  if (productId) {
    result = await Product.deleteOne({
      _id: productId
    })
  }
  if (productIds && Array.isArray(productIds)) {
    result = await Product.deleteMany({
      _id: {
        $in: productIds
      }
    })
  }
  return result
}

module.exports = {
  addProduct,
  getProducts,
  destoryProduct
}
