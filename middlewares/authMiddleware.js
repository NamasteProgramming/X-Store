/**
 * This middleware is used to check whether a user is logged in or not
 */
const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  return res.redirect('/login')
}

module.exports = authMiddleware
