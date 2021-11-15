const request = require('supertest')
const app = require('../app')

const api = request(app)

let token
let id

describe('POST /auth/register', () => {
  it('should respond with 4 missing fields when sending empty request', async () => {
    await api.post('/auth/register').then((response) => {
      expect(response.statusCode).toBe(400)
      expect(response.type).toBe('application/json')
      expect(response.body.type).toBe('ValidationError')
      expect(response.body.errors.length).toBe(4)
    })
  })

  it('should respond with 2 validation errors when sending invalid email and password', async () => {
    const userData = {
      firstName: 'J',
      lastName: 'D',
      email: 'johndoe.com',
      password: '1234'
    }
    await api
      .post('/auth/register')
      .send(userData)
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe('application/json')
        expect(response.body.type).toBe('ValidationError')
        expect(response.body.errors.length).toBe(2)
      })
  })

  it('should reply with token and non admin user when sending valid data', async () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: '123456'
    }
    await api
      .post('/auth/register')
      .send(data)
      .then((response) => {
        const resData = response.body.data
        token = resData.token
        id = resData.userData.id

        expect(response.type).toBe('application/json')
        expect(resData.userData.roleId).toBe(2)
        expect(resData.token === undefined).toBe(false)
      })
  })

  it('should reply 403 when trying to register with same email', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: '123456'
    }
    await api
      .post('/auth/register')
      .send(userData)
      .then((response) => {
        expect(response.statusCode).toBe(403)
      })
  })
})

describe('POST /auth/login', () => {
  it('should reply with 2 validation errors when sending empty request', async () => {
    await api.post('/auth/login').then((response) => {
      expect(response.statusCode).toBe(400)
      expect(response.body.type).toBe('ValidationError')
      expect(response.body.errors.length).toBe(2)
    })
  })

  it('should reply with 2 validation errors when sending invalid data', async () => {
    const userData = {
      email: 'johndoe.com',
      password: '1234'
    }
    await api
      .post('/auth/login')
      .send(userData)
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.body.type).toBe('ValidationError')
        expect(response.body.errors.length).toBe(2)
      })
  })

  it('should reply with token when logging in', async () => {
    const userData = {
      email: 'john@doe.com',
      password: '123456'
    }
    await api
      .post('/auth/login')
      .send(userData)
      .then((response) => {
        expect(response.body.data.token === undefined).toBe(false)
      })
  })

  it('should fail login when using wrong credentials', async () => {
    const userData = {
      email: 'fake@superfake.com',
      password: '######'
    }
    await api
      .post('/auth/login')
      .send(userData)
      .then((response) => {
        expect(response.statusCode).toBe(401)
      })
  })
})

describe('Cleanup DELETE /users/:id', () => {
  it('should respond with 200 when deleting user recently created', async () => {
    await api
      .delete(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })
})
