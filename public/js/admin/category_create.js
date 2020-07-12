var app = new Vue({
  el: '#app',

  data: {
    inputTypeOptions: [
      {
        label: 'Fractional Number',
        value: 'fractionalNumberInput',
      },
      {
        label: 'Complete Number',
        value: 'completeNumberInput',
      },
      {
        label: 'Text',
        value: 'textInput',
      },
      {
        label: 'Select (One)',
        value: 'selectOne',
      },
      {
        label: 'Select (Multiple)',
        value: 'selectMultiple'
      }
    ],
    category: {
      name: '',
      description: '',
      seoDescription: '',
      properties: [{
        name: 'Storage',
        required: true,
        input: {
          type: '',
          propertyChoices: [{
            name: 'Android',
            value: 'android'
          }]
        }
      },{
        name: 'RAM',
        required: true,
        input: {
          type: '',
          propertyChoices: [{
            label: '',
            value: ''
          }]
        }
      }]
    }
  },

  methods: {
    saveCategory: function() {
      console.log(this.category);
    },

    addNewProperty: function() {
      this.category.properties.push({
        name: 'Storage',
        required: true,
        input: {
          type: '',
          propertyChoices: [{
            name: 'Android',
            value: 'android'
          }]
        }
      })
    },

    removeProperty: function(index) {
      this.category.properties.splice(index, 1);
    },

    addNewChoice: function(propertyChoices) {
      propertyChoices.push({
        name: '',
        value: ''
      })
    },

    removeChoice: function(index, choices) {
      choices.splice(index, 1);
    }
  }
});
