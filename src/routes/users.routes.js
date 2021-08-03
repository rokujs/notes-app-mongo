const express = require('express')
const router = express.Router()

const { renderSignInForm, renderSignUpForm, signIn, signup, logout } = require('../controllers/users.controller')

router.get('/users/signin', renderSignInForm)
router.post('/users/signin', signIn)

router.get('/users/signup', renderSignUpForm)
router.post('/users/signup', signup)

router.get('/users/logout', logout)

module.exports = router