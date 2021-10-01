const request = require('supertest')

const app = require('../app')

const api = request(app)

describe('GET /news', () => {
  test('respond with 200 code when it returns a json containing a list of all news', async () => {
    await api
      .get('/news')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })
})
