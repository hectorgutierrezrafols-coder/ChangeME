const { clerkMiddleware, getAuth } = require('@clerk/express')

// This verifies the token Clerk sends in every request
const requireAuth = (req, res, next) => {
  const { userId } = getAuth(req)
  if (!userId) {
    return res.status(401).json({ error: 'No autorizado' })
  }
  req.userId = userId
  next()
}

module.exports = { clerkMiddleware, requireAuth }