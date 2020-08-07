const categoryDev = {
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
    hasUnits: false,
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
    hasUnits: false,
    units: [],
    filterChoices: [],
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
