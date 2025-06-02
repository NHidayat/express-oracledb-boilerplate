const { formatDate } = require('./Helper')

const originalConsoleLog = console.log
const originalConsoleError = console.error
const originalConsoleInfo = console.info

console.log = function (...args) {
  const timestamp = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
  originalConsoleLog.apply(console, [`[${timestamp}]`, ...args])
}

console.error = function (...args) {
  const timestamp = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
  originalConsoleError.apply(console, [`[${timestamp}]`, ...args])
}

console.info = function (...args) {
  const timestamp = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
  originalConsoleInfo.apply(console, [`[${timestamp}]`, ...args])
}
