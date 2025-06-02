const oracledb = require('oracledb')
const uuid = require('uuid')
const config = require('../config')
oracledb.initOracleClient()

process.env.onConnectingDb = true
const onConnectingDbMsg = 'Sedang menghubungkan, coba beberapa saat lagi'

let aliasCounter = 1

const dbInitialize = async (name = 1) => {
  try {
    process.env.onConnectingDb = true

    const alias = name.toString()

    const result = await oracledb.createPool({
      poolAlias: alias,
      user: config.database.user,
      password: config.database.password,
      connectString: config.database.connectString,
      poolMin: 10,
      poolMax: 500,
      poolTimeout: 30,
      poolIncrement: 100,
      poolPingInterval: 60
    })

    process.env.onConnectingDb = false
    return result
  } catch (error) {
    console.log(error.message)
  }
}

const handleConnectionError = async (error, connectionName = '1') => {
  const msg = error.message.split(' ')[0]
  console.log(msg)

  const codeToReconnect = ['NJS-040:', 'NJS-500:', 'DPI-1010:', 'ORA-28547']

  if (codeToReconnect.includes(msg)) {
    try {
      const alias = uuid.v4()
      await dbInitialize(alias)
      aliasCounter = alias

      return true
    } catch (err) {
      throw new Error('Terjadi kesalahan. Silahkan coba lagi')
    }
  } else {
    throw error
  }
}

const checkIsConnecting = () => {
  if (process.env.onConnectingDb === 'true') {
    throw new Error(onConnectingDbMsg)
  }
}

const execute = async (data = { sql: '', bindData: [], getFirst: false }) => {
  checkIsConnecting()
  let connection
  try {
    const connection = await oracledb.getConnection(aliasCounter.toString())
    const hit = await connection.execute(data.sql, data.bindData || [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    })

    connection.commit()
    connection.close()

    const rows = hit.rows || hit

    return data.getFirst ? (rows[0] || {}) : rows
  } catch (err) {
    connection.rollback()
    connection.release()

    await handleConnectionError(err, '1')
  }
}

const transaction = async (callback) => {
  checkIsConnecting()
  let trx
  try {
    trx = await oracledb.getConnection(aliasCounter.toString())
    const result = await callback(trx)

    trx.commit()
    trx.close()

    return result
  } catch (err) {
    trx.rollback()
    trx.release()
    await handleConnectionError(err, '1')
  }
}

module.exports = {
  dbInitialize,
  execute,
  transaction
}
