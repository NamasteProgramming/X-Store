const app = new Vue({
  el: '#app',

  data: {
    categories: [],
    inputTypeOptions: [{
      label: 'Fractional Number',
      value: 'fractionalNumber'
    },
    {
      label: 'Complete Number',
      value: 'completeNumber'
    },
    {
      label: 'Text (One Line)',
      value: 'textOneline'
    },
    {
      label: 'Text (Multiline Line)',
      value: 'textMultiline'
    },
    {
      label: 'Select (One)',
      value: 'selectOne'
    },
    {
      label: 'Select (Multiple)',
      value: 'selectMultiple'
    }],

    filterTypes: [{
      label: 'Less Then or Equals',
      value: 'lte'
    }, {
      label: 'Less Then',
      value: 'lt'
    }, {
      label: 'Equals',
      value: 'eq'
    }, {
      label: 'Greater Then',
      value: 'gt'
    }, {
      label: 'Greater Then or Equals',
      value: 'gte'
    }],

    // Category object which will be sent to the backend
    category: {
      categoryId: '',
      name: 'Mobile',
      description: 'Category description goes here',
      seoDescription: 'Subcategory description goes here',
      isLeaf: true,
      properties: [{
        name: 'Storage',
        required: true,
        filterable: true,
        hasUnits: true,
        units: [{
          label: 'MB',
          printLabel: 'MB',
          threshold: 1024,
          nextLabel: 'GB'
        }, {
          label: 'GB',
          printLabel: 'GB',
          threshold: 1024,
          nextLabel: 'TB'
        }, {
          label: 'TB',
          printLabel: 'TB',
          threshold: 1024,
          nextLabel: 'PB'
        }, {
          label: 'PB',
          printLabel: 'PB'
        }],
        filterChoices: [{
          label: '1 GB',
          value: '1 GB',
          type: 'eq'
        }],
        input: {
          type: 'fractionalNumber',
          propertyChoices: []
        }
      }, {
        name: 'RAM',
        required: true,
        filterable: false,
        input: {
          type: 'fractionalNumber',
          propertyChoices: []
        },
        units: [],
        filterChoices: []
      }, {
        name: 'OS',
        required: true,
        filterable: true,
        input: {
          type: 'selectOne',
          propertyChoices: [{
            label: 'Android',
            value: 'android'
          }, {
            label: 'iOS',
            value: 'ios'
          }, {
            label: 'Windows',
            value: 'windows'
          }]
        }
      }]
    }
  },

  methods: {
    saveCategory: function () {
      console.log(JSON.stringify(this.category))
      axios.post('/api/v1/category', this.category)
        .then(result => {
          console.log(result)
          console.log(result.data)
        })
    },

    // Property methods
    addNewProperty: function () {
      const categoryObject = {
        name: '',
        required: true,
        filterChoices: [],
        units: [],
        input: {
          type: 'fractionalNumber',
          propertyChoices: []
        }
      }
      this.category.properties.push(categoryObject)
    },

    removeProperty: function (index) {
      this.category.properties.splice(index, 1)
    },

    // Input Choices methods
    addNewChoice: function (property) {
      const choiceObject = {
        name: '',
        value: ''
      }

      property.input.propertyChoices.push(choiceObject)
    },

    removeChoice: function (index, property) {
      property.input.propertyChoices.splice(index, 1)
    },

    // Units
    addUnit: function (property) {
      const unitObject = {
        label: '',
        printLabel: '',
        threshold: 10,
        nextLabel: ''
      }

      property.units.push(unitObject)
    },

    removeUnit: function (index, units) {
      units.splice(index, 1)
    },

    // Filters
    addFilter: function (property) {
      const filterObject = {
        label: '',
        printLabel: '',
        type: ''
      }
      property.filterChoices.push(filterObject)
    },

    removeFilter: function (index, property) {
      property.filterChoices.splice(index, 1)
    }
  }
})
