process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../server')

chai.use(chaiHttp)

describe('Variables', () => {
    it('API_SECRET should be defined', (done) => {
        process.env.API_SECRET.exist
        done()
    })
    it('API_EMAIL should be defined', (done) => {
        process.env.API_EMAIL.exist
        done()
    })
    it('API_EMAIL_PASS should be defined', (done) => {
        process.env.API_EMAIL_PASS.exist
        done()
    })
})

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
