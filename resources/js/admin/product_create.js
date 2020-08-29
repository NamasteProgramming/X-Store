const app = new Vue({
  el: '#app',

  data: {
    rawCategories: categories,

    // Product object which will be sent to the backend
    product: {
      categoryId: '',
      name: '',
      description: '',
      seoDescription: ''
    }
  },

  methods: {
    saveProduct: function () {
      axios.post('/api/v1/product', this.product)
        .then(result => {
          console.log(result)
          console.log(result.data)
        })
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
