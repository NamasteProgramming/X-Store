/**
 * It is similar to having an env file
 */

module.exports = {
  port: parseInt(process.env.PORT) || 3000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/x-store',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  assetUrl: process.env.ASSET_URL || 'http://localhost:3000'
}
