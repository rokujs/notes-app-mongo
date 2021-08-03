const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const morgan = require('morgan')
const passport = require('passport')

// initiation
const app = express()
require('./config/passport')

// settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: 'hbs'
}))
app.set('view engine', '.hbs')

// middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'nana',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global variables
app.use((req, res, next) => {
  res.locals.msg = req.flash('success_msg')
  res.locals.error = req.flash('error_msg')
  res.locals.error_msg = req.flash('error')
  res.locals.user = req.user || null
  next()
})

// routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/users.routes'))

// static files
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app