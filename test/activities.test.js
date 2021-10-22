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

describe('POST /activities', () => {
    test('respond with 200 when the activity is created', async () => {
      const data = {
        name: 'Activity',
        image: 'http://exampleimg.com',
        content: 'new activity'
      }
      await api
      .post('/activities')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        id = response.body.data.id
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })

  test('respond with 400 when the activity cannot be created because it does not meet the field validation', async () => {
    const data = {}
    await api
      .post('/activities')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.type).toBe('application/json')
      })
  })
})

describe('GET /activities', () => {
    test('respond with a 200 code when it returns a json containing a list of all activities', async () => {
      await api.get('/activities').then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
    })
  
    test('respond with a 200 code when return a json containing activity with id', async () => {
      await api.get(`/activities/${id}`).then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
    })
  
    test('respond with a 404 code when the activity is non-existent', async () => {
      await api.get('/activities/0').then((response) => {
        expect(response.statusCode).toBe(404)
      })
    })
  })

  describe('PUT /activities', () => {
    test('respond with a code 200 when the activity is successfully modified', async () => {
      const data = {
        name: 'Edited',
        image: 'http://exampleimg.com',
        content: 'new activity'
      }
  
      await api
        .put(`/activities/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .then((response) => {
          expect(response.statusCode).toBe(200)
          expect(response.type).toBe('application/json')
        })
    })
  
    test('respond with 401 code when the user is not authorized to updated', async () => {
      const data = {
        name: 'Actividad',
        image: 'http://exampleimg.com',
        content: 'Activity updated '
      }
  
      await api
        .put(`/activities/${id}`)
        .send(data)
        .then((response) => {
          expect(response.statusCode).toBe(401)
        })
    })
  
    test('respond with a 404 code when the Activity is non-existent', async () => {
      const data = {
        name: 'Actividad',
        image: 'http://exampleimg.com',
        content: 'Activity updated '
      }
  
      await api
        .put('/activities/noexists')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .then((response) => {
          expect(response.statusCode).toBe(404)
        })
    })
  })
  
  describe('DELETE /activities', () => {
    test('respond with 200 when the activity is deleted', async () => {
      await api
        .delete(`/activities/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200)
          expect(response.type).toBe('application/json')
        })
    })
  
    test('respond with 401 when the user is not authorized to deleted', async () => {
      await api.delete(`/activities/${id}`).then((response) => {
        expect(response.statusCode).toBe(401)
      })
    })
  
    test('respond with a 404 code when the activity is non-existent', async () => {
      await api
        .delete('/activities/noexists')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(404)
        })
    })
  })