const { path, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

module.exports = validField
