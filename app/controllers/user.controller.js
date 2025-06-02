const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const catchAsync = require('../utils/catchAsync')
const { appResponse } = require('../utils/response')

const userController = {

  getUsers: catchAsync(async (req, res) => {
    const result = await userModel.getAll()
    return appResponse(res, 200, 'success get users', result)
  }),

  getUser: catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await userService.getUser(id)
    return appResponse(res, 200, 'success get user', result)
  }),

  updateUser: catchAsync(async (req, res) => {
    const { id } = req.params
    const getUser = await userService.getUser(id)

    const payload = {
      USER_NAME: req.body.USER_NAME || getUser.USER_NAME,
      USER_BRANCH: req.body.USER_BRANCH || getUser.USER_BRANCH,
      USER_ZONE_CODE: req.body.USER_ZONE_CODE || getUser.USER_ZONE_CODE
    }
    await userModel.update(payload, id)

    return appResponse(res, 200, 'success update user', req.body)
  })

}

module.exports = userController
