const jwt = require('jsonwebtoken')

const verifyAdmin = (req, res, next) => {
  try {
    // Protect Route with JWT only for admin users
    if (req.user.roleId === 1) {
      jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (error, data) => {
        if (error) {
          res.status(403).json({
            ok: false,
            msg: error.message
          })
          next()
        } else {
          res.status(200).json({
            ok: true,
            data
          })
          next()
        }
      })
      next()
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

module.exports = { verifyAdmin }
