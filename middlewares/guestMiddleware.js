const guestMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) return next()

  res.redirect('/homepage')
}

module.exports = guestMiddleware
