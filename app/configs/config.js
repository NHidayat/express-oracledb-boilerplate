const dotenv = require('dotenv')
dotenv.config()
const env = process.env

const config = {
  port: env.PORT || 3000,

  database: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    connectString: env.DB_CONNECT_STRING
  }

}

module.exports = config
