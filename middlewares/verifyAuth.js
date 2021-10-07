const jwt = require('jsonwebtoken')

const { JWT_SECRET_KEY } = process.env

const verifyToken = async (req, res, next) => {
  try {
    // get the token from the headers:
    const token = req.headers['x-access-token']
    if (!token) throw new Error('no Token aws Provided')

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
