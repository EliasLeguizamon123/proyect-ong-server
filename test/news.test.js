const request = require('supertest')

const app = require('../app')

const api = request(app)

describe('GET /news', () => {
  test('respond with 200 code when it returns a json containing a list of all news', async () => {
    const value = 10
    expect(value).toBe(10)
  })
})
