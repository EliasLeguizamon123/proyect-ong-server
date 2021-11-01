const jwt = require('jsonwebtoken')

const { JWT_SECRET_KEY } = process.env

const verifyToken = async (req, res, next) => {
  try {
    // get the token from the headers:
    const token = req.headers.authorization.split(' ')[1]

    // decode the token
    const decoded = jwt.verify(token, JWT_SECRET_KEY)

    // save the user info
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: error.message
    })
  }
}

const verifyAdmin = (req, res, next) => {
  if (req.user.roleId === 1) {
    next()
  } else {
    res.status(401).json({
      ok: false,
      msg: 'Acceso no autorizado.'
    })
  }
}

module.exports = {
  verifyToken,
  verifyAdmin
}
