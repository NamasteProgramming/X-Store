const { baseUrl, assetUrl } = require('./config')

const genereateBaseUrl = (path) => `${baseUrl}/${path}`
const generateAssetUrl = (path) => `${assetUrl}/${path}`

module.exports = {
  generateAssetUrl,
  genereateBaseUrl
}
