const jwt = require('jsonwebtoken')

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  try {
    // Protect Route with JWT only for admin users
    if (req.body.roleId === 1) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, data) => {
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
