const mongoose = require('mongoose')

const unitSchema = mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  printLabel: {
    type: String,
    required: true
  },
  threshold: Number,
  nextLabel: String

})
const Unit = mongoose.model('Unit', unitSchema)

module.exports = Unit
