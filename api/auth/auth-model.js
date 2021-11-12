const db = require('../../data/dbConfig')

function findBy(filter) {
    return db('users').where(filter)
}

function findById(id) {
    return db('users').where({ id }).first()
}

async function add(user) {
    const [id] = await db('users').insert(user)
    const newUser = findById(id)
    return newUser
}

module.exports = {
    findBy, 
    findById,
    add
}