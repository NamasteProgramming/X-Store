const app = new Vue({
  el: '#app',

  data: {
    categories,
    meta,

    // UI Data
    currentPageNo: 1
  },

  methods: {
    getCategories (pageNo) {
      axios.get('/api/v1/category', {
        params: { pageNo }
      })
        .then(result => {
          this.categories = result.data.data.categories
          this.meta = result.data.data.meta
        })
    },

    destroy (id) {
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
    }
  },

  computed: {
    pagination: function () {
      return {
        totalPages: Math.ceil(this.meta.total / this.meta.pageSize),
        currentPage: this.meta.pageNo
      }
    }
  }
})
