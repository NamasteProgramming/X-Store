const Category = require('../modules/category/models/Category')

const seedCategories = async () => {
  const electronics = new Category({
    name: 'Electronics',
    isLeaf: false,
    description: 'All kind of electronics',
    soeDescription: 'All kind of electronics'
  })
  await electronics.save()

  const mobile = new Category({
    categoryId: electronics._id,
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
  })
  await mobile.save()
}

seedCategories()
