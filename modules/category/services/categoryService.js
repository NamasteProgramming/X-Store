const Category = require('../models/Category')
const Property = require('../models/Property')
const Unit = require('../models/Unit')
const FilterChoice = require('../models/FilterChoice')
const { calculateOffset } = require('../../../utils/global')
const { populate } = require('../models/Category')

/**
 * Create new category
 * @param {Object} categoryInput - Category input, validated by category validation
 * @returns {Category}
 */
const addCategory = async (categoryInput) => {
  const propertyIds = []
  if (
    categoryInput.properties &&
    Array.isArray(categoryInput.properties) &&
    categoryInput.properties.length
  ) {
    for (let i = 0; i < categoryInput.properties.length; i++) {
      const unitIds = []
      const filterChoiceIds = []

      const propertyInput = categoryInput.properties[i]

      for (let j = 0; j < propertyInput.units.length; j++) {
        const unitInput = propertyInput.units[j]
        const unit = new Unit(unitInput)
        await unit.save()
        unitIds.push(unit._id)
      }
      propertyInput.units = unitIds

      for (let j = 0; j < propertyInput.filterChoices.length; j++) {
        const filterChoiceInput = propertyInput.filterChoices[j]
        const filterChoice = new FilterChoice(filterChoiceInput)
        await filterChoice.save()
        filterChoiceIds.push(filterChoice._id)
      }
      propertyInput.filterChoices = filterChoiceIds

      const property = new Property(propertyInput)
      await property.save()
      propertyIds.push(property._id)
    }
  }
  categoryInput.properties = propertyIds

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

const getCategories = async ({
  filters,
  pageNo = 1,
  pageSize = 10,
  keyword
}) => {
  pageNo = parseInt(pageNo)
  pageSize = parseInt(pageSize)

  const conditions = {}
  if (keyword) {
    conditions.name = {
      $regex: keyword
    }
  }

  const [categories, total] = await Promise.all([
    Category.find(conditions)
      .populate({
        path: 'properties',
        populate: ['units', 'filterChoices']
      })
      .skip(calculateOffset({ pageNo, pageSize }))
      .limit(pageSize)
      .lean(),
    Category.countDocuments(conditions)
  ])

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

const destoryCategory = async ({ categoryId, categoryIds }) => {
  let result
  if (categoryId) {
    result = await Category.deleteOne({
      _id: categoryId
    })
  }
  if (categoryIds && Array.isArray(categoryIds)) {
    result = await Category.deleteMany({
      _id: {
        $in: categoryIds
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
