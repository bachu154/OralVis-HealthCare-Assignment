const jwt = require("jsonwebtoken")

const authRequired = (req, res, next) => {
  const header = req.headers.authorization || ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: "Missing Authorization header" })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload // { id, role }
    next()
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}

const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ error: "Forbidden: insufficient role" })
  }
  next()
}

module.exports = { authRequired, requireRole }
