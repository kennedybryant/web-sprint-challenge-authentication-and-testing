const { JWT_SECRET } = require('../secrets')
const jwt = require('jsonwebtoken')
const { findBy } = require('../auth/auth-model')


const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    next({
      status: 401,
      message: 'Token required'
    })
  } else {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        next({
          status: 401,
          message: 'Token invalid'
        })
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  }
}

const checkUsernameExists = async (req, res, next) => {
  try {
    const [user] = await findBy({ username: req.body.username })
    if (!user) {
      next({
        status: 401,
        message: 'Invalid credentials'
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  restricted,
  checkUsernameExists
}
