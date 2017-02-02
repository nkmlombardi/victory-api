process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../server')

chai.use(chaiHttp)

describe('Endpoints', () => {
    it('base url should return HTTP status code 200', (done) => {
        chai.request(server)
            .get('/')
            .end((error, response) => {
                response.statusCode.should.be.eql(200)
                done(error)
            })
    })
})

describe('Authentication endpoints', () => {
    xit('should return an object trying to authenticate', (done) => {
        chai.request(server)
            .get('/v1/authenticate')
            .end((error, response) => {
                response.body.should.be.a('object')
                done(error)
            })
    })
})
