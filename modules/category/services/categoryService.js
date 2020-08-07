const Category = require('../models/Category')
const { calculateOffset } = require('../../../utils/global')
/**
 * Create new category
 * @param {Object} categoryInput - Category input, validated by category validation
 * @returns {Category}
 */
const addCategory = async (categoryInput) => {
  const category = new Category(categoryInput)
  await category.save()
  return category
}

const getNonLeafCategories = async () => {
  const categories = await Category.find({
    isLeaf: false,
    isActive: true
  }).lean()
  return categories
}

const getCategories = async ({ filters, pageNo = 1, pageSize = 10 }) => {
  pageNo = parseInt(pageNo)
  pageSize = parseInt(pageSize)

  const conditions = {}

  const categories = await Category.find(conditions)
    .skip(calculateOffset({ pageNo, pageSize }))
    .limit(pageSize)
    .lean()

  const total = await Category.countDocuments(conditions)
  const meta = {
    total,
    pageNo,
    pageSize
  }
  return {
    categories,
    meta
  }
}

const destoryCategory = async ({
  categoryId,
  categoryIds
}) => {
  let result
  if (categoryId) {
    result = await Category.deleteOne({
      _id: categoryId
    })
  }
  if (categoryIds) {
    result = await Category.deleteOne({
      $in: {
        _id: categoryIds
      }
    })
  }
  return result
}

module.exports = {
  addCategory,
  getNonLeafCategories,
  getCategories,
  destoryCategory
}
