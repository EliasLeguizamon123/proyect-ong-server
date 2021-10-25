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

describe('POST / organization', () => {
  test('respond with 200 when a links of organization is created', async () => {
    const data = {
      socialNetwork: 'Instagram',
      link: 'https://www.instagram.com'
    }

    await api
      .post(`/organizations/${id}/links`)
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        id = response.body.data.id
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with 400 when the links of organization cannot be created because it does not meet the field validation', async () => {
    const data = {}
    await api
      .post(`/organizations/${id}/links`)
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe('application/json')
      })
  })
})

describe('GET /publicData', () => {
  test('respond with a 200 code when it returns a json containing a list of public data', async () => {
    await api.get('/organizations/1').then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
    })
  })

  test('respond with a 404 code when the organization is non-exist', async () => {
    await api.get('/organizations/0').then((response) => {
      expect(response.statusCode).toBe(404)
    })
  })
})

describe('PATCH /organizations', () => {
  test('respond with a code 200 when the organization data is successfully modified', async () => {
    const data = {
      name: 'Somos 1 Más',
      image: 'http://www.testimage.com.ar'
    }

    await api
      .patch('/organizations/1')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with a 404 code when the Activity is non-existent', async () => {
    const data = {
      name: 'Somos Más',
      image: 'http://www.testimage.com'
    }

    await api
      .patch('/organizations/0')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(404)
      })
  })
})

describe('DELETE /organizations', () => {
  test('respond with 200 when the link is deleted', async () => {
    await api
      .delete(`/organizations/1/links/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with a 404 code when the link is non-existent', async () => {
    await api
      .delete('/organizations/1/links/0')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(404)
      })
  })
})
