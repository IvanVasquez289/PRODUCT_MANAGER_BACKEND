import request from 'supertest'
import { testServer } from "../test-server"
import { DatabaseConnection } from '../../src/data/postgres/init';
import { envs } from "../../src/config/envs";

const dbConnection = new DatabaseConnection(envs.POSTGRES_URI)

beforeAll(async() => {
    await testServer.start()
    await dbConnection.connect()
})

afterAll(async() => {
    await dbConnection.db.sync({force: true})
    await dbConnection.close()
    await testServer.close()
})

const product1 = {
    name: "Bocina LG",
    price: 1000,
    availability: true
}
describe('post /api/products', () => {



    test('get /api/products', async() => {
        const res = await request(testServer.app)
            .get('/api/products')
            .expect(200)
        
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toBeInstanceOf(Array)

        expect(res.status).not.toBe(500)
    })

    test('should display validation errors post /api/products/', async() => {
       const res = await request(testServer.app)
            .post('/api/products')
            .send({})
            .expect(400)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeInstanceOf(Array)
        expect(res.body.errors).toHaveLength(4)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })


    test('should validate that the price is greater than 0 POST /api/products', async() => {
        const res = await request(testServer.app)
            .post('/api/products')
            .send({ name: "Bocina LG", price: 0 })
            .expect(400)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeInstanceOf(Array)
        expect(res.body.errors).toHaveLength(1)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })

    test('should validate that the price is a number and greater than 0 POST /api/products', async() => {
        const res = await request(testServer.app)
            .post('/api/products')
            .send({ name: "Bocina LG", price: "Hola" })
            .expect(400)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeInstanceOf(Array)
        expect(res.body.errors).toHaveLength(2)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(1)
    })
    


    test('post /api/products', async() => {
        const res = await request(testServer.app)
            .post('/api/products')
            .send(product1)
            .expect(201)

        expect(res.status).toBe(201)
        expect(res.body).toEqual({
            data: expect.objectContaining(product1)
        })
        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(200)

    })
})

describe('get /api/products/:id', () => {

    test('should get a product', async() => {
        // crear un producto
        const {body: {data: product}} = await request(testServer.app)
            .post('/api/products')
            .send({ name: "Bocina LG", price: 1000 })

        const res = await request(testServer.app)
            .get(`/api/products/${product.id}`)
            .expect(200)

        expect(res.status).toBe(200)
        expect(res.body).toEqual({
            data: product
        })
        expect(res.status).not.toBe(404)
    })

    test('should return 404 if product not found', async() => {
        const res = await request(testServer.app)
            .get('/api/products/100')
            .expect(404)

        expect(res.status).toBe(404)
        expect(res.body).toEqual({
            message: "El producto no existe"
        })
    })

    test('should check a valid ID in the URL', async() => {
        const res = await request(testServer.app)
            .get('/api/products/novalido')
            .expect(400)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeInstanceOf(Array)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('ID no valido')
        expect(res.status).not.toBe(404)
    })
})

describe('put /api/products/:id', () => {

    test('should check a valid ID in the URL', async() => {
        const res = await request(testServer.app)
            .put('/api/products/novalido')
            .send(product1)
            .expect(400)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeInstanceOf(Array)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('ID no valido')
        expect(res.status).not.toBe(404)
    })

    test('should display validation errors when updating a product', async() => {
        const res = await request(testServer.app)
            .put('/api/products/1')
            .send({})
            .expect(400)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeInstanceOf(Array)
        expect(res.body.errors).toHaveLength(5)
        expect(res.status).toBeTruthy()
        expect(res.body).not.toHaveProperty('data')
    })

    test('shoulv validate that the price is greater than 0 ', async() => {
        const res = await request(testServer.app)
            .put('/api/products/1')
            .send({ name: "Bocina LG", price: 0, availability: true })
            .expect(400)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeInstanceOf(Array)
        expect(res.body.errors).toHaveLength(1)

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    test('should return 404 if product not found', async() => {
        const res = await request(testServer.app)
            .put('/api/products/100')
            .send(product1)
            .expect(404)

        expect(res.status).toBe(404)
        expect(res.body).toEqual({
            message: "El producto no existe"
        })
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    test('should update a product', async() => {

        const res = await request(testServer.app)
            .put('/api/products/1')
            .send({
                name: "Terreneitor",
                price: 3500,
                availability: false
            })

        expect(res.status).toBe(200)
        expect(res.body).toEqual({
            data: expect.objectContaining({
                name: "Terreneitor",
                price: 3500,
                availability: false
            })
        })
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty('errors')

    })
})