const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  return res.redirect('/login')
}

module.exports = authMiddleware
