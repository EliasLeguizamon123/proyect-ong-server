const request = require('supertest')

const app = require('../app')
const api = request(app)

let token

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

describe('GET /testimonials', () => {
  test('respond with a 200 code when it returns a json containing a list of all testimonials', async () => {
    await api.get('/testimonials').then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
    })
  })

  test('respond with a 200 code when return a json containing testimony with id', async () => {
    await api.get('/testimonials/1').then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
    })
  })

  test('respond with a 404 code when the testimony is non-existent', async () => {
    await api.get('/testimonials/noexiste').then((response) => {
      expect(response.statusCode).toBe(404)
    })
  })
})

describe('POST /testimonials', () => {
  test('respond with 200 when the testimony is created', async () => {
    const data = {
      name: 'Testimony',
      image: 'http://exampleimg.com',
      content: 'new testimony'
    }

    await api
      .post('/testimonials')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with 401 code when the user is not authorized to created', async () => {
    const data = {
      name: 'Testimony',
      image: 'new image',
      content: 'new testimony'
    }

    await api
      .post('/testimonials')
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(401)
      })
  })

  test('respond with 400 when the testimony cannot be created because it does not meet the field validation', async () => {
    const data = {}

    await api
      .post('/testimonials')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe('application/json')
      })
  })
})

describe('DELETE /testimonials', () => {
  test('respond with 200 when the testimony is deleted', async () => {
    await api
      .delete('/testimonials/15')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with 401 when the user is not authorized to deleted', async () => {
    await api.delete('/testimonials/15').then((response) => {
      expect(response.statusCode).toBe(401)
    })
  })

  test('respond with a 404 code when the testimony is non-existent', async () => {
    await api
      .delete('/testimonials/noexists')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(404)
      })
  })
})

describe('PUT /testimonials', () => {
  test('respond with a code 200 when the testimony is successfully modified', async () => {
    const data = {
      name: 'Edited',
      image: 'http://exampleimg.com',
      content: 'new testimony'
    }

    await api
      .put('/testimonials/1')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        console.log(response)
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with 401 code when the user is not authorized to updated', async () => {
    const data = {
      name: 'Testimonio',
      image: 'http://exampleimg.com',
      content: 'Testimony updated '
    }

    await api
      .put('/testimonials/1')
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(401)
      })
  })

  test('respond with a 404 code when the testimony is non-existent', async () => {
    const data = {
      name: 'Testimonio',
      image: 'http://exampleimg.com',
      content: 'Testimony updated '
    }

    await api
      .put('/testimonials/noexists')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(404)
      })
  })
})
