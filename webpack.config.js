const path = require('path')

const entries = {
  'js/admin/category_create.js': './resources/js/admin/category_create.js',
  'js/admin/category_list.js': './resources/js/admin/category_list.js'
}
module.exports = [{
  name: 'watch',
  mode: 'development',
  watch: true,
  entry: entries,
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'public')
  }
}, {
  name: 'prod',
  mode: 'production',
  entry: entries,
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'public')
  }
}]
