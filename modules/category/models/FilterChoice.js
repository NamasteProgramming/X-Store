const mongoose = require('mongoose')

const filterChoiceSchema = mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['lt', 'lte', 'eq', 'gte', 'gt'],
    required: true
  }
})
const FilterChoice = mongoose.model('FilterChoice', filterChoiceSchema)

module.exports = FilterChoice
