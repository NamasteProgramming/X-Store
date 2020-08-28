const debounce = require('lodash.debounce')
const { cutter } = require('../../../utils/global')

Vue.use(VueLoading)
Vue.component('paginate', VuejsPaginate)
Vue.component('loading', VueLoading)
Vue.mixin({
  methods: {
    cutter
  }
})

const app = new Vue({
  el: '#app',

  data: {
    categories,
    meta,

    // UI Data
    currentPageNo: 1,
    pageSize: 10,
    isLoading: false,
    keyword: ''
  },

  methods: {
    getCategories: function (pageNo) {
      try {
        this.isLoading = true
        pageNo = pageNo || this.currentPageNo
        const params = { pageNo, pageSize: this.pageSize }

        if (this.keyword) {
          params.keyword = this.keyword
        }

        axios.get('/api/v1/category', {
          params
        })
          .then(result => {
            this.categories = result.data.data.categories
            this.meta = result.data.data.meta
            this.isLoading = false
          })
      } catch (e) {
        console.error(e)
        this.isLoading = false
      }
    },

    destroy: function (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios.delete(`/api/v1/category/${id}`)
            .then(result => {
              Swal.fire(
                'Deleted!',
                'Your category has been deleted.',
                'success'
              )
              this.getCategories(this.meta.pageNo)
            })
        }
      })
    },

    getSerial (number) {
      return ((this.meta.pageNo - 1) * this.meta.pageSize) + number + 1
    },

    _getCategories: debounce(function () {
      this.getCategories(this.currentPageNo)
    }, 1000)
  },

  computed: {
    pagination: function () {
      return {
        totalPages: Math.ceil(this.meta.total / this.meta.pageSize),
        currentPage: this.meta.pageNo
      }
    }
  },

  watch: {
    pageSize: function () {
      this._getCategories()
    },

    keyword: function () {
      this._getCategories()
    }
  }
})
