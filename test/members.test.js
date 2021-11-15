const request = require('supertest')

const app = require('../app')

const api = request(app)

let id

describe('POST /members', () => {
  test('respond with 201 when the member is created', async () => {
    const data = {
      name: 'demo',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png'
    }
    await api
      .post('/members')
      .send(data)
      .then((response) => {
        id = response.body.data.id
        expect(response.statusCode).toBe(201)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with 400 when the member cannot be created because it does not meet the field validation', async () => {
    const data = {}

    await api
      .post('/members')
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe('application/json')
      })
  })
})

describe('GET /members', () => {
  test('respond with a 200 code when it returns a json containing a list of all members', async () => {
    await api.get('/members').then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
    })
  })
})

describe('PUT /members', () => {
  test('respond with a code 200 when the member is successfully modified', async () => {
    const data = {
      name: 'Edited',
      image: 'http://exampleimg.com'
    }

    await api
      .put(`/members/${id}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with 400 when the member cannot be created because it does not meet the field validation', async () => {
    const data = {}

    await api
      .put(`/members/${id}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with a 404 code when the member is non-existent', async () => {
    const data = {
      name: 'Fulano',
      image: 'http://exampleimg.com',
      content: 'member updated '
    }

    await api
      .put('/members/noexists')
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(404)
        expect(response.type).toBe('application/json')
      })
  })
})

describe('DELETE /members', () => {
  test('respond with 200 when the member is deleted', async () => {
    await api.delete(`/members/${id}`).then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
    })
  })

  test('respond with a 404 code when the member is non-existent', async () => {
    await api.delete('/members/noexists').then((response) => {
      expect(response.statusCode).toBe(404)
    })
  })
})
