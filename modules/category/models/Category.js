const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  /**
   * OPTIONAL: Parent category id
   * Ex: Electronics > Mobile
   * In case of mobile it will store id of electronics category
   */
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    index: true,
    sparse: true // Required with optional index
  },

  /**
   * Name of the category
   */
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name can\'t be smaller than 2 characters'],
    maxlength: [32, 'Name can\'t be greater than 64 characters']
  },

  /**
   * Is category a leaf category
   * Leaf category have product as child
   * Non leaf category have category as child
   * Ex: Electronics > Mobile
   * Here electronics is not leaf category because it doesn't have any product
   * Mobile is leaf category because it has products as child
   */
  isLeaf: {
    type: Boolean,
    required: true
  },

  /**
   * TEXT ONLY: Category description
   */
  description: {
    type: String,
    required: [true, 'Description is required']
  },

  /**
   * Will be used for SEO
   */
  seoDescription: {
    type: String,
    max: 160
  },

  /**
   * Category thumbnail
   */
  thumbnail: {
    path: String, // Path is equivalent to URL
    driver: String // Driver refers to local, s3, ftp, etc.
  },

  /**
   * OPTIONAL: Properties that applies to this category
   */
  properties: [{
    ref: 'Property',
    type: mongoose.Types.ObjectId
  }],

  /**
   * Reserved for future
   */
  isActive: {
    type: Boolean,
    default: true
  },

  /**
   * Stores when this product got deleted
   */
  deletedAt: {
    type: Date
  }
}, {
  timestamps: true
})

categorySchema.pre('save', function (next) {
  const errors = {}
  for (let i = 0; i < this.properties.length; i++) {
    const property = this.properties[i]
    if (property.filterable && !['selectOne', 'selectMultiple'].includes(property.input.type)) {
      if (!property.filterChoices.length) {
        errors[`properties[${i}].filterChoices`] = 'Filter choices must contain at least 1 item'
      }
    }
  }
  if (Object.keys(errors).length) {
    return next(errors)
  }
  return next()
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
