const guestMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) return next()
  return res.redirect('/homepage')
}

module.exports = guestMiddleware
