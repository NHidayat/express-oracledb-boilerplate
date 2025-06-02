const { Router } = require('express')
const userController = require('../controllers/user.controller')
const userValidation = require('../validations/user.validation')
const validate = require('../middleware/validate')

const router = Router()

router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.put('/:id', validate(userValidation.userUpdate), userController.updateUser)

module.exports = router
