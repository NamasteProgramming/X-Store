const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/x-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

module.exports = mongoose.connection
