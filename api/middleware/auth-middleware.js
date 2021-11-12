const Users = require('../auth/auth-model')
const { findBy } = require('../auth/auth-model')
const bcrypt = require('bcryptjs')

const validateUser = (req, res, next) => {
    const { username, password } = req.body
    if (!username.trim() || !password.trim()) {
        next({ status: 400, message: 'username and password required'})
    } else {
        req.body.username = username.trim()
        req.body.password = password.trim()
        next()
    }
}

const checkUsernameUnique = async (req, res, next) => {
    const existingUser = await Users.findBy({ username: req.body.username })
    if (existingUser.length < 1) {
        next()
    } else {
        next({ status: 400, message: 'username taken'})
    }
}

const checkUsernameExists = async (req, res, next) => {
    const { username, password } = req.body
    try {
      const user = await findBy({username: username})
      if (user.length > 0 && bcrypt.compareSync(password, user[0].password)) {
       req.databaseUser = user[0]
       next()
      } else {
        next({ status: 401, message: 'invalid credentials'})
      }
    } catch (err) {
      next(err)
    }
}

module.exports = {
    validateUser,
    checkUsernameUnique,
    checkUsernameExists
}