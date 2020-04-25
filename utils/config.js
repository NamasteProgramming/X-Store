module.exports = {
  port: parseInt(process.env.PORT) || 3000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/x-store'
}
