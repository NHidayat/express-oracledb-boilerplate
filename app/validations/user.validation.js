const Joi = require('joi')

const userUpdate = {
  body: Joi.object({
    USER_NAME: Joi.string().uppercase().trim().max(30).allow(''),
    USER_BRANCH: Joi.string().uppercase().trim().max(7).allow(''),
    USER_ZONE_CODE: Joi.string().uppercase().trim().max(10).allow('')
  })
}

module.exports = {
  userUpdate
}
