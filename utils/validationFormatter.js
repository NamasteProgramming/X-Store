/**
 * Formates joi validation errors
 * @param {Object} rawErrors Error returned from Joi
 */
const joiErrorFormatter = (rawErrors) => {
  const errors = {}
  const details = rawErrors.details
  details.map(d => {
    errors[d.path] = [d.message]
  })
  return errors
}

/**
 * Formates mongoose validation errors
 * @param {Object} rawErrors Error returned from mongoose
 */
const mongooseErrorFormatter = (rawErrors) => {
  const errors = {}
  const details = rawErrors.errors
  for (const key in details) {
    errors[key] = [details[key].message]
  }
  return errors
}

module.exports = { joiErrorFormatter, mongooseErrorFormatter }
