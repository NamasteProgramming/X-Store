const mongoose = require('mongoose')

const choicesSchema = {
  label: {
    type: String,
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed
  }
}

const categorySchema = mongoose.Schema({
  /**
   * Name of the category
   */
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name can\'t be smaller than 2 characters'],
    maxlength: [32, 'Name can\'t be greater than 64 characters']
  },

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

  thumbnail: {
    type: String
  },

  /**
   * Filters that applies to this category
   */
  filters: [{
    /**
     * Filter name like RAM, Storage
     */
    name: {
      type: String,
      required: true
    },

    /**
     * Optional
     * Possible choices for filter like 1GB, 2GB
     */
    choices: [choicesSchema],

    /**
     * Is it required on product
     */
    required: {
      type: Boolean
    },

    /**
     * Input Type
     */
    input: {
      type: {
        type: String,

        /**
         * What kind of input is shown to product detail input
         */
        enum: ['numberInput', 'textInput', 'selectOne', 'selectMultiple']
      },

      /**
       * Available values for filter
       */
      choices: [choicesSchema]
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
