const path = require('path')
const { curryN, compose } = require('ramda')

const resolve = curryN(2, path.resolve)

global.rootRequire = compose(require, resolve('./'))

global.apiRequire = compose(require, resolve('api/'))
global.socketRequire = compose(require, resolve('sockets'))

global.requireDb = require(path.join(__dirname, '/models'))
