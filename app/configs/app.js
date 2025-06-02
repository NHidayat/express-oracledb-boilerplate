require('../utils/modifyLog')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('../routes')
const { appResponse } = require('../utils/response')

const app = express()

// enable cors
app.use(cors())
app.options('*', cors())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// logger
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// routes
app.use('/', routes)

app.all('*', (_, res) => {
  return appResponse(res, 404, 'Service not found')
})

module.exports = app
