const { User } = requireDb

const jwt = require('jsonwebtoken')

const passport = require('passport')

const passportJWT = require("passport-jwt")
const passportLocal = require("passport-local")

const { ExtractJwt, Strategy: JwtStrategy } = passportJWT
const { Strategy: LocalStrategy } = passportLocal

const localStrategy = new LocalStrategy(
  { usernameField: 'email', session: false },
  (email, password, done) =>
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email' })
        }
        return Promise.all([ user.validPassword(password), user ])
      }).then(([validPassword, user]) => {
        if (!validPassword) {
          return done(null, false, { message: 'Incorrect password' })
        }
        return done(null, user)
      })
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
