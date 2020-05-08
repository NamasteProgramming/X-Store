const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  /**
   * Name of the category
   */
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name can\'t be smaller than 2 characters'],
    maxlength: [64, 'Name can\'t be greater than 64 characters']
  },

  /**
   * Fitlers that applies to this category
   */
  filters: [{
    /**
     * Filter name like RAM, Storage
     */
    name: String,

    /**
     * Possible values for filter like 1GB, 2GB
     */
    values: [{
      type: String
    }],

    /**
     * Is it required on product
     */
    required: Boolean,

    /**
     * Type
     */
    type: {
      type: Object,

      /**
       * What kind of input is shown to product detail input
       */
      enum: ['numberInput', 'textInput', 'selectOne', 'selectMultiple'],

      /**
       * Available values for filter
       */
      values: [{
        type: String
      }]
    }
  }],

  /**
   * Reserved for future
   */
  isActive: {
    type: Boolean,
    default: true
  },

  /**
   * Set to true when product is soft deleted
   */
  isDeleted: {
    type: Date
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

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
