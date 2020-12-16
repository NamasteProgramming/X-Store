const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
  /**
   * Is it required on product
   */
  required: {
    type: Boolean,
    required: true
  },

  /**
   * Property name like RAM, Storage
   */
  name: {
    type: String,
    required: true
  },

  /**
   * Only filterable properties will show in the list
   */
  filterable: {
    type: Boolean,
    default: false
  },

  /**
   * Indicates whether property have any units
   */
  hasUnits: Boolean,

  /**
   * Applied unit to this category
   * In case of storage it can be MB, GB, TB, etc
   * [{ label: "KB", threshold: 1024, nextLabel: "MB"},
   * { label: "MB", threshold: 1024, nextLabel: "GB"},
   * { label: "GB", threshold: 1024, nextLabel: "TB"},
   * { label: "TB", threshold: 1024, nextLabel: "PB"}]
   */
  units: [{
    type: mongoose.Types.ObjectId,
    ref: 'Unit'
  }],

  /**
   * Optional
   * Possible choices for filter like 1GB, 2GB
   */
  filterChoices: [{
    type: mongoose.Types.ObjectId,
    ref: 'FilterChoice'
  }],

  /**
   * Input Type
   */
  input: {
    type: {
      type: String,

      /**
       * What kind of input is shown to product detail input
       */
      enum: [
        'fractionalNumber', // Numbers with decimal points
        'completeNumber', // Numbers without decimal points
        'textOneline', // One line of text
        'textMultiline', // Paragraph line of text
        'selectOne', // Dropdown with abitlity to select one
        'selectMultiple' // Dropdown with abiltiy to select multiple
      ]
    },

    /**
     * When input type is select, this array is used to generate dropdown
     */
    propertyChoices: [{
      label: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }]
  }
})
const Property = mongoose.model('Property', propertySchema)

module.exports = Property
