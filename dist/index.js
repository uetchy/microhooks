
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./microhooks.cjs.production.min.js')
} else {
  module.exports = require('./microhooks.cjs.development.js')
}
