const fs          = require('fs')
const path        = require('path')
const Sequelize   = require('sequelize')
const basename    = path.basename(module.filename)
const env         = process.env.NODE_ENV || 'development'
const dbConfig    = require('../config/db.js')[env]

const upperFirst = name => name.charAt(0).toUpperCase() + name.slice(1)
const fileIsModelDir = file => fs.lstatSync(file).isDirectory()

let sequelize

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, dbConfig)
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)
}

const db = {}

fs.readdirSync(__dirname)
  .map(file => __dirname + '/' + file)
  .filter(fileIsModelDir)
  .forEach(file => {
    const model = sequelize.import(file + '/index.js')
    const ModelRef = upperFirst(model.name) // user -> User
    db[ModelRef] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.sequelize.sync({ force: true })

module.exports = db
