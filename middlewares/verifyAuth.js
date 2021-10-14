const jwt = require('jsonwebtoken')

const { JWT_SECRET_KEY } = process.env

const verifyToken = async (req, res, next) => {
  try {
    // get the token from the headers:
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      res.status(401).json({
        ok: false,
        msg: 'No Auth Provided'
      })
    }

    // decode the token
    const decoded = jwt.verify(token, JWT_SECRET_KEY)

    // save the user info
    req.user = decoded
    next()
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

module.exports = {
  verifyToken
}
