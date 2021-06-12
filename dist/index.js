
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-awesome-lightbox.cjs.production.min.js')
} else {
  module.exports = require('./react-awesome-lightbox.cjs.development.js')
}
