/**
 * Prevents logged in user from visiting guest only pages
 */
const guestMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) return next()
  return res.redirect('/dashboard')
}

module.exports = guestMiddleware
