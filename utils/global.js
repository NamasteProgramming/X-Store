const isString = (variable) => (typeof variable === 'string' || variable instanceof String)
const isObject = (variable) => typeof variable === 'object'

/**
 * Deletes string keys with falsy values
 * @param {Object} obj Object which is being trimmed
 */
const trimObject = (obj) => {
  for (const key in obj) {
    if (isString(obj[key]) && (!obj[key].trim())) {
      delete obj[key]
    } else if (isObject(obj[key])) {
      trimObject(obj[key])
    }
  }
}

/**
 * Trim string values and converts emails to lowercase
 * @param {Object} obj Object which is being sanitized
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
 */
const trimAndsantizeObject = (obj) => {
  for (const key in obj) {
    if (isString(obj[key])) {
      if (!obj[key].trim()) {
        delete obj[key]
        continue
      }
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

module.exports = {
  trimObject,
  santizeObject,
  trimAndsantizeObject,
  isString
}
