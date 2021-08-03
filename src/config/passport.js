const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  // Match email
  const user = await User.findOne({ email })
  if (!user) {
    return done(null, false, { message: 'Not user found' })
  } else {
    // Match password
    const match = await user.matchPassword(password)
    return match
      ? done(null, user)
      : done(null, false, { message: 'Incorrect Password' })
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})