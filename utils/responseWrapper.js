const successWrapper = ({
  status = 200,
  message = 'Success',
  data = null,
  res
}) => {
  return res.status(status).json({
    message,
    data
  })
}

const errorWrapper = ({
  message = 'Something went wrong',
  status = 500,
  errors = null,
  type = 'UnknownError', // ValidationError, GeneralError, UnknownError
  res
}) => {
  return res.status(status).json({
    message,
    errors,
    type
  })
}

module.exports = {
  successWrapper,
  errorWrapper
}
