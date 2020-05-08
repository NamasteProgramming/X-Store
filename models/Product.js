const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  /**
   * Name of the product
   */
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name can\'t be smaller than 2 characters'],
    maxlength: [64, 'Name can\'t be greater than 64 characters']
  },

  /**
   * Sellers, one product can be sold by multiple owners
   */
  sellerIds: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
    index: true
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

const Product = mongoose.model('Product', productSchema)

module.exports = Product
