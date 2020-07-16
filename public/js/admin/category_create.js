var app = new Vue({
  el: '#app',

  data: {
    categories: [],
    inputTypeOptions: [{
      label: 'Fractional Number',
      value: 'fractionalNumber',
    },
    {
      label: 'Complete Number',
      value: 'completeNumber',
    },
    {
      label: 'Text (One Line)',
      value: 'textOneline',
    },
    {
      label: 'Text (Multiline Line)',
      value: 'textMultiline',
    },
    {
      label: 'Select (One)',
      value: 'selectOne',
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
        filterChoices: [],
        input: {
          type: 'fractionalNumber',
          propertyChoices: []
        }
      }, {
        name: 'RAM',
        required: true,
        filterable: true,
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
    saveCategory: function() {
      console.log(this.category);
    },

    // Property methods
    addNewProperty: function() {
      this.category.properties.push({
        name: '',
        required: true,
        filterChoices: [],
        units: [],
        input: {
          type: 'fractionalNumber',
          propertyChoices: []
        }
      });
    },

    removeProperty: function(index) {
      this.category.properties.splice(index, 1);
    },

    // Input Choices methods
    addNewChoice: function(property) {
      const choiceObject = {
        name: '',
        value: ''
      };

      if (Array.isArray(property.input.propertyChoices)) {
        return property.input.propertyChoices.push(choiceObject);
      }
      property.input.propertyChoices = [choiceObject];
    },

    removeChoice: function(index, property) {
      property.input.propertyChoices.splice(index, 1);
    },

    // Units
    addUnit(property) {
      const unitObject = {
          label: '',
          printLabel: '',
          threshold: 10,
          nextLabel: ''
      };

      if (Array.isArray(property.units)) {
        return property.units.push(unitObject);
      }
      property.units = [unitObject];
    },

    removeUnit: function(index, units) {
      units.splice(index, 1);
    },

    // Filters
    addFilter(property) {
      const filterObject = {
        label: '',
        printLabel: '',
        type: ''
      };
      if (Array.isArray(property.filterChoices)) {
        return property.filterChoices.push(filterObject);
      }
      property.filterChoices = [filterObject];
    },

    removeFilter: function(index, property) {
      property.filterChoices.splice(index, 1);
    },
  }
});
