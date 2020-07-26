const isString = (variable) => (typeof variable === 'string' || variable instanceof String)
const isObject = (variable) => typeof variable === 'object'

/**
 * Deletes string keys with falsy values
 * @param {Object} obj Object which is being trimmed
 * @returns {undefined} It returns nothing
 */
const trimObject = (obj) => {
  for (const key in obj) {
    if (isString(obj[key]) && (!obj[key].trim())) {
      delete obj[key]
    } else if (Array.isArray(obj[key])) {
      for (let i = 0; i < obj[key].length; i++) {
        trimObject(obj[key][i])
      }
    } else if (isObject(obj[key])) {
      trimObject(obj[key])
    }
  }
}

/**
 * Trim string values and converts emails to lowercase
 * @param {Object} obj Object which is being sanitized
 * @returns {undefined} It returns nothing
 */
const santizeObject = (obj) => {
  for (const key in obj) {
    if (isString(obj[key])) {
      if (key.indexOf('password') !== -1) {
        continue
      }
      obj[key] = obj[key].trim()
      if (key === 'email') {
        obj[key] = obj[key].toLowerCase()
      }
    } else if (Array.isArray(obj[key])) {
      for (let i = 0; i < obj[key].length; i++) {
        santizeObject(obj[key][i])
      }
    } else if (isObject(obj[key])) {
      santizeObject(obj[key])
    }
  }
}

/**
 * Deletes falsy strings, trims strings and changes emails to lowercase
 * @param {Object} obj Object which is being trimmed and sanitized
 * @returns {undefined} It returns nothing
 */
const trimAndSantizeObject = (obj) => {
  for (const key in obj) {
    if (isString(obj[key])) {
      /**
       * If key contains password, don't do anything
       */
      if (key.toLowerCase().indexOf('password') !== -1) {
        continue
      }

      /**
       * If key is false after trimming, delete it
       */
      if (!obj[key].trim()) {
        delete obj[key]
        continue
      }

      /**
       * Trim string
       */
      obj[key] = obj[key].trim()

      /**
       * If key name is email, convert it to lowercase
       */
      if (key.toLowerCase().indexOf('email') !== -1) {
        obj[key] = obj[key].toLowerCase()
      }
    } else if (Array.isArray(obj[key])) {
      /**
       * Santize all keys in array
       */
      for (let i = 0; i < obj[key].length; i++) {
        trimAndSantizeObject(obj[key][i])
      }
    } else if (isObject(obj[key])) {
      /**
       * If value is object, recursively trim all children
       */
      trimAndSantizeObject(obj[key])
    }
  }
}

module.exports = {
  trimObject,
  santizeObject,
  trimAndSantizeObject,
  isString
}
