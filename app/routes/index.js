const { Router } = require('express')
const router = Router()
const userRoutes = require('./user.route')

router.use('/users', userRoutes)

module.exports = router
