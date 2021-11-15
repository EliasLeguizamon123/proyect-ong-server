const request = require('supertest')
const app = require('../app')
const api = request(app)

let token
let id

beforeAll(async () => {
  await api
    .post('/auth/login')
    .send({
      email: 'test@test.com',
      password: '123456'
    })
    .then((response) => {
      token = response.body.data.token
    })
})

describe('POST /news', () => {
  const data = {
    name: 'It is a very interesting news',
    content: 'Something interesting happened',
    image: 'https://thumbs.dreamstime.com/b/surprised-people-17803437.jpg'
  }

  test('respond with 200 when the new is posted', async () => {
    await api
      .post('/news')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        id = response.body.data.id
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with 401 code when the user is not authorized to post', async () => {
    await api
      .post('/news')
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(401)
      })
  })

  test('should respond with 3 missing fields when sending empty request', async () => {
    await api
      .post('/news')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: '',
        content: '',
        image: ''
      })
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe('application/json')
        expect(response.body.type).toBe('ValidationError')
        expect(response.body.errors.length).toBe(3)
      })
  })
})

describe('GET /news', () => {
  test('respond with 200 code when it returns a json containing a list of all news', async () => {
    await api.get('/news').then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
    })
  })

  test('respond with 200 code when it returns a json containing a news by id', async () => {
    await api.get(`/news/${id}`).then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
    })
  })

  test('respond with a 404 code when the news is non-existent', async () => {
    await api.get('/news/noexists').then((response) => {
      expect(response.statusCode).toBe(404)
    })
  })
})

describe('PUT /news', () => {
  const data = {
    name: 'It is a very boring news',
    content: 'Something boring happened',
    image:
      'https://thumbs.dreamstime.com/z/boring-work-young-business-people-looking-bored-sitting-together-table-looking-away-71518165.jpg'
  }

  test('respond with 200 when the new is updated', async () => {
    await api
      .put(`/news/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with 401 code when the user is not authorized to update', async () => {
    await api
      .put(`/news/${id}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(401)
      })
  })

  test('should respond with 3 missing fields when sending empty request', async () => {
    await api
      .put(`/news/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: '',
        content: '',
        image: ''
      })
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe('application/json')
        expect(response.body.type).toBe('ValidationError')
        expect(response.body.errors.length).toBe(3)
      })
  })
})

describe('DELETE /news', () => {
  test('respond with 200 when the news is deleted', async () => {
    await api
      .delete(`/news/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with a 404 code when the news is non-existent', async () => {
    await api
      .delete('/news/noexists')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(404)
      })
  })

  test('respond with 401 when the user is not authorized to deleted', async () => {
    await api.delete(`/news/${id}`).then((response) => {
      expect(response.statusCode).toBe(401)
    })
  })
})
