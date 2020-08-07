const app = new Vue({
  el: '#app',

  data: {
    rawCategories: categories,
    inputTypeOptions,
    filterTypes: filterTypeOptions,

    // Category object which will be sent to the backend
    category: {
      categoryId: '',
      name: '',
      description: '',
      seoDescription: '',
      isLeaf: false,
      properties: []
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
        hasUnits: false,
        filterable: false,
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
  },

  computed: {
    categories: function () {
      const prefixParentName = (category) => {
        if (!category.processed && category.categoryId) {
          const parentCategory = this.rawCategories.find(c => c._id === category.categoryId)
          if (parentCategory.categoryId && !parentCategory.processed) {
            prefixParentName(parentCategory)
          }
          category.name = parentCategory.name + ' > ' + category.name
          category.processed = true
        }
      }

      return this.rawCategories.map(category => {
        prefixParentName(category)
        return category
      })
    }
  }
})
