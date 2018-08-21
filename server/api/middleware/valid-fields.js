const { allPass, pipe, prop } = require('ramda')

const validField = apiRequire('middleware/valid-field')

const validFields = (p, fields) =>
  p ? pipe(
    prop(p),
    allPass(
      fields.map(field => validField(field))
    )
  )
  :
  allPass(
    fields.map(field => validField(field))
  )

module.exports = validFields
