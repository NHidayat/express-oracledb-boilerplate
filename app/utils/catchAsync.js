const { appResponse } = require('./response')

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const errCode = err.statusCode ? err.statusCode : 500
    return appResponse(res, errCode, err.message || 'Internal server error')
  })
}

module.exports = catchAsync
