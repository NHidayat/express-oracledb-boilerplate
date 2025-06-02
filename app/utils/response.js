const appResponse = (response, statusCode = 200, message = 'ok', data) => {
  return response.status(statusCode).json({
    status: statusCode || 200,
    message: message || 'ok',
    data
  })
}

const joiError = (response, error) => {
  const errData = error?.details?.map(detail => ({
    message: detail.message,
    key: detail.context.key
  }))

  return appResponse(response, 400, error.details[0].message || 'Validation Error', errData)
}

module.exports = {
  appResponse,
  joiError
}
