process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../server')

chai.use(chaiHttp)

describe('Clients', () => {
    it('should return a 500 HTTP status code', (done) => {
        chai.request(server)
        .get('/v1/clients')
        .end((error, response) => {
            response.status.should.be.eql(500)
        })
        done()
    }),

    it('should return with a 404 status code if a potentially valid resource is not found', (done) => {
        chai.request(server)
        .get('/v1/clients/31337357')
        .end((error, response) => {
            response.statusCode.should.be.eql(404)
        })
        done()
    }),

    it('should return with a 400 status code if an invalid resource is queried for', (done) => {
        chai.request(server)
        .get('/v1/clients/x23g!2')
        .end((error, response) => {
            response.statusCode.should.be.eql(400)
        })
        done()
    }),

    it('should return an object', (done) => {
        chai.request(server)
        .get('/v1/clients')
        .end((error, response) => {
            response.body.should.be.a('object')
        })
        done()
    }),

    it('the object should have an array', (done) => {
        chai.request(server)
        .get('/v1/clients')
        .end((error, response) => {
            response.body.should.have.property('data')
            response.body.data.should.be.a('array')
        })
        done()
    }),

    it('the array should contain at least one object', (done) => {
        chai.request(server)
        .get('/v1/clients')
        .end((error, response) => {
            response.body.data[0].should.be.a('object')
            response.body.data.length.should.be.gt(0)
        })
        done()
    }),

    it('should be able to query a single client by its id', (done) => {
        chai.request(server)
        .get('/v1/clients')
        .end((error, response) => {
            const clientId = response.body.data[0].client_id
            chai.request(server)
            .get('/v1/clients/' + clientId)
            .end((error, response) => {
                response.body.data.should.be.a('object')
                response.body.data.client_id.should.be.deep.eql(clientId)
            })
        })
        done()
    })
})
