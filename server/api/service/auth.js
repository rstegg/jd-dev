const { User } = requireDb

const jwt = require('jsonwebtoken')

const passport = require('passport')

const passportJWT = require("passport-jwt")
const passportLocal = require("passport-local")

const { ExtractJwt, Strategy: JwtStrategy } = passportJWT
const { Strategy: LocalStrategy } = passportLocal

const localStrategy = new LocalStrategy(
  { session: false },
  (username, password, done) =>
    User.findOne({ where: { username } })
      .then(user =>
        !user ? done(null, false, { message: 'Incorrect username' })
        : !user.validPassword(password) ? done(null, false, { message: 'Incorrect password' })
        : done(null, user)
      )
      .catch(err => done(err))
)

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
jwtOptions.secretOrKey = process.env.JWT_SECRET
jwtOptions.ignoreExpiration = true

const jwtStrategy = new JwtStrategy(jwtOptions,
  (jwt_payload, done) =>
    User.findById(jwt_payload.id)
      .then(user =>
        !user ? done(null, false, { error: 'Invalid token' })
        : done(null, user)
      )
      .catch(err => done(err))
)

passport.use(jwtStrategy)
passport.use(localStrategy)

module.exports = passport
