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

  await api
    .post('/auth/register')
    .send({
      firstName: 'Testing',
      lastName: 'User',
      email: 'testing@testing.com',
      password: '123456'
    })
    .then((res) => {
      id = res.body.data.userData.id
    })
})

describe('GET /users', () => {
  test('respond with a 200 code when it returns a json containing a list of all users', async () => {
    await api.get('/users').then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
    })
  })

  test('respond with a 200 code when return a json containing user with id', async () => {
    await api.get(`/users/${id}`).then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
    })
  })

  test('respond with a 404 code when the user is non-existent', async () => {
    await api.get('/users/noexists').then((response) => {
      expect(response.statusCode).toBe(404)
    })
  })
})

describe('Patch /users', () => {
  test('respond with a code 200 when the user is successfully modified', async () => {
    const data = {
      firstName: 'Testing',
      lastName: 'patch',
      roleId: 1
    }

    await api
      .patch(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })
  test('respond with 400 when the user cannot be updated because it does not meet the field validation', async () => {
    const data = {}

    await api
      .patch(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe('application/json')
      })
  })
})

test('respond with 401 code when the user is not authorized to updated', async () => {
  const data = {
    firstName: 'Testing',
    lastName: 'patch',
    roleId: 1
  }

  await api
    .patch(`/users/${id}`)
    .send(data)
    .then((response) => {
      expect(response.statusCode).toBe(401)
    })
})

test('respond with a 404 code when the user is non-existent', async () => {
  const data = {
    firstName: 'Testing',
    lastName: 'patch',
    roleId: 1
  }

  await api
    .patch('/users/0')
    .set('Authorization', `Bearer ${token}`)
    .send(data)
    .then((response) => {
      expect(response.statusCode).toBe(404)
    })
})

describe('DELETE /users', () => {
  test('respond with 200 when the user is deleted', async () => {
    await api
      .delete(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with 401 when the user is not authorized to deleted', async () => {
    await api.delete(`/users/${id}`).then((response) => {
      expect(response.statusCode).toBe(401)
    })
  })

  test('respond with a 404 code when the user is non-existent', async () => {
    await api
      .delete('/users/noexists')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(404)
      })
  })
})
