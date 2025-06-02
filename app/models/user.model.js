const { execute } = require('../configs/database/database')

const userModel = {

  getAll: async () => {
    return await execute({
      sql: "SELECT USER_ID, USER_NAME, USER_BRANCH, USER_ZONE_CODE FROM ORA_USER WHERE USER_ZONE_CODE = 'CGK029' AND USER_ACTIVE = 'Y'"
    })
  },

  getById: async (id) => {
    return await execute({
      sql: 'SELECT * FROM ORA_USER WHERE USER_ID = :DATA',
      bindData: [id],
      getFirst: true
    })
  },

  update: async (data, id) => {
    return await execute({
      sql: `
        UPDATE ORA_USER SET USER_NAME = :DATA, USER_BRANCH = :DATA, USER_ZONE_CODE = :DATA
        WHERE USER_ID = '${id}'`,
      bindData: [data.USER_NAME, data.USER_BRANCH, data.USER_ZONE_CODE],
      getFirst: true
    })
  }

}

module.exports = userModel
