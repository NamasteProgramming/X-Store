const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
require('./utils/db.config')
const MongoStore = require('connect-mongo')(session)
const mongoDbConnection = require('./utils/db.config')
const passport = require('passport')
require('./utils/authStategies/localStrategy')
const authMiddleware = require('./middlewares/authMiddleware')
const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
// app.set('trust proxy', 1)
app.use(session({
  secret: '788a154e2a8d07c4cafdee4a7d6dff2d90ab2586',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore({ mongooseConnection: mongoDbConnection })
}))
app.use(passport.initialize())
app.use(passport.session())
app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}

app.use('/', authRoutes)

app.get('/', (req, res) => {
  console.log('User:', req.user)
  return res.render('index')
})

app.get('/homepage', authMiddleware, (req, res) => {
  res.send(`welcome ${req.user.name}`)
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
