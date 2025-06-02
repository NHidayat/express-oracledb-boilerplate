const moment = require('moment')

const helper = {
  formatDate: (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(new Date(date)).format(format)
  }
}

module.exports = helper
