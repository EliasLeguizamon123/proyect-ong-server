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

    return next()
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

module.exports = {
  verifyToken
}
