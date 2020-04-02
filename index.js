const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
require('./utils/db.config')

const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
// app.set('trust proxy', 1)
app.use(session({
  secret: '788a154e2a8d07c4cafdee4a7d6dff2d90ab2586',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', authRoutes)

app.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1
  console.log(`You have visited ${req.session.views} times`)
  return res.render('index')
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
