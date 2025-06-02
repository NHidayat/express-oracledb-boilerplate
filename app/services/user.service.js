const userModel = require('../models/user.model')
const ApiError = require('../utils/ApiError')

const getUser = async (id) => {
  const result = await userModel.getById(id)
  if (!result.USER_ID) {
    throw new ApiError(404, 'user not found')
  }
  return result
}

module.exports = {
  getUser
}
