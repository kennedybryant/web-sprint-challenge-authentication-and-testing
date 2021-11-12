const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe('[POST] /api/auth/register', () => {
  test('returns user after registration', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: 'Charlie', password: '1234' })
    expect(res.status).toBe(201)
  })
})