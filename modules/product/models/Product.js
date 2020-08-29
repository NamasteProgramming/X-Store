const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    index: true
  },

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

  seoDescription: {
    type: String,
    max: 160
  },

  thumbnail: {
    path: String, // Path is equivalent to URL
    driver: String // Driver refers to local, s3, ftp, etc.
  },

  isActive: {
    type: Boolean,
    default: true
  },

  deletedAt: {
    type: Date
  }
}, {
  timestamps: true
})

productSchema.pre('save', async function (next) {
  // Make sure categoryId is valid
  const categoryCount = await mongoose.models.Category.countDocuments({ _id: this.categoryId })
  return !categoryCount
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
