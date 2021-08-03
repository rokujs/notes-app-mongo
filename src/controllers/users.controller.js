const User = require('../models/user')
const passport = require('passport')

const usersCtrl = {}

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup')
}

usersCtrl.signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  const errors = []

  if (password !== confirmPassword) {
    errors.push({ text: 'Passwords do not match.' })
    console.log(password);
    console.log('first');
  }

  if (password.length < 4) {
    errors.push({ text: 'Password musth be at least four characters.' })
    console.log(password);
    console.log('Second');
  }

  if (errors.length > 0) {
    res.render('users/signup', { errors, name, email })
  } else {
    const emailUser = await User.findOne({ email })

    if (emailUser) {
      req.flash('error_msg', 'The email is already in use.')
      res.redirect('/users/signup')
    }
    else {
      const newUser = new User({ name, email, password })
      newUser.password = await newUser.encryptPassword(password)
      await newUser.save()

      req.flash('success_msg', 'You are registered')
      res.redirect('/users/signin')
    }
  }
}

usersCtrl.renderSignInForm = (req, res) => {
  res.render('users/signin')
}

usersCtrl.signIn = passport.authenticate('local', {
  failureRedirect: '/users/signin',
  successRedirect: '/notes',
  failureFlash: true
})


usersCtrl.logout = (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are logged out now')
  res.redirect('/users/signin')
}


module.exports = usersCtrl