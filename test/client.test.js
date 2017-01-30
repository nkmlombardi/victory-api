process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../server')
chai.use(chaiHttp)

describe('Clients', () => {
    it('should return an object', function (done) {
        chai.request(server)
            .get('/v1/clients')
            .end((error, response) => {
                response.body.should.be.a('object')
                done()
            })
    }),

    it('the object should have an array', function (done) {
        chai.request(server)
            .get('/v1/clients')
            .end((error, response) => {
                response.body.should.have.property('data')
                response.body.data.should.be.a('array')
                done()
            })
    }),

    it('the array should contain at least one object', function (done) {
        chai.request(server)
            .get('/v1/clients')
            .end((error, response) => {
                response.body.data[0].should.be.a('object')
                response.body.data.length.should.be.gt(0)
                done()
            })
    }),

    it('should be able to query a single client by its id', function (done) {
        chai.request(server)
            .get('/v1/clients')
            .end((error, response) => {
                var clientId =  + response.body.data[0].client_id

                chai.request(server)
                    .get('/v1/clients/' + clientId)
                    .end((error, response) => {
                        response.body.data.should.be.a('object')
                        response.body.data.client_id.should.be.deep.eql(clientId)
                        done()
                    })
            })
    })
})
