const mongoose = require('mongoose')
const config = require('./config')
mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

module.exports = mongoose.connection
