const request = require('supertest')

const app = require('../app')

const api = request(app)

let id

describe('GET /contacts', () => {
    let token
    await api.post('/auth/login').send({
        email: 'test@test.com',
        password: '123456'
    })
        .then((response) => {
            token = response.body.data.token
        })

    test('respond with 200 code when it returns a json containing a list of all contacts', async () => {
        await api.get('/contacts')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200)
                expect(response.type).toBe('application/json')
            })
    })

    test('respond with 401 when the user is not authorized to see all contacts', async () => {
        await api.get(`/contacts`)
            .then((response) => {
                expect(response.statusCode).toBe(401)
            })
    })
})

describe('POST /contacts', () => {
    it('respond with 200 code when all fields were completed successfully', async () => {
        const contactData = {
            name: 'Jane Doe',
            phone: '+12345678',
            email: 'janedoe@mail.com',
            message: 'I need help with this'
        }
        await api.post('/contacts')
            .send(contactData)
            .then((response) => {
                id = response.body.data.id
                expect(response.statusCode).toBe(200)
                expect(response.type).toBe('application/json')
            })
    })

    it('should respond with 1 validation error when sending invalid email', async () => {
        const contactData = {
            name: 'Jane Doe',
            phone: '+12345678',
            email: 'janedoemail.com',
            message: 'I need help with this'
        }
        await api.post('/contacts')
            .send(contactData)
            .then((response) => {
                expect(response.statusCode).toBe(400)
                expect(response.type).toBe('application/json')
                expect(response.body.type).toBe('ValidationError')
                expect(response.body.errors.length).toBe(1)
            })
    })

    it('should respond with 1 validation error when sending invalid name', async () => {
        const contactData = {
            name: 'J',
            phone: '+12345678',
            email: 'janedoe@mail.com',
            message: 'I need help with this'
        }
        await api.post('/contacts')
            .send(contactData)
            .then((response) => {
                expect(response.statusCode).toBe(400)
                expect(response.type).toBe('application/json')
                expect(response.body.type).toBe('ValidationError')
                expect(response.body.errors.length).toBe(1)
            })
    })

    it('should respond with 4 missing fields when sending empty request', async () => {
        await api.post('/contacts')
            .then((response) => {
                expect(response.statusCode).toBe(400)
                expect(response.type).toBe('application/json')
                expect(response.body.type).toBe('ValidationError')
                expect(response.body.errors.length).toBe(4)
            })
    })
})

describe('DELETE /contacts', () => {
    let token
    await api.post('/auth/login').send({
        email: 'test@test.com',
        password: '123456'
    })
        .then((response) => {
            token = response.body.data.token
        })

    test('respond with 200 when the contact is deleted', async () => {
        await api
            .delete(`/contacts/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200)
                expect(response.type).toBe('application/json')
            })
    })

    test('respond with a 404 code when the contact is non-existent', async () => {
        await api
            .delete('/contacts/noexists')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(404)
            })
    })

    test('respond with 401 when the user is not authorized to deleted', async () => {
        await api.delete(`/contacts/${id}`)
            .then((response) => {
                expect(response.statusCode).toBe(401)
            })
    })
})