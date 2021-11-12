const db = require('../../data/dbConfig')

async function findBy(filter) {
    const user = db('users').where(filter)
    return user
}

function findById(id) {
    return db('users').where('id', id).first()
}

async function add(user) {
    const [id] = await db('users').insert(user)
    const newUser = findById({id})
    return newUser
}

module.exports = {
    findBy, 
    findById,
    add
}