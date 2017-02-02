process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../server')

chai.use(chaiHttp)

describe('Targets', () => {
    it('should successfully return a 200 HTTP status code', (done) => {
        chai.request(server)
        .get('/v1/targets')
        .end((error, response) => {
            response.statusCode.should.be.eql(200)
        })
        done()
    }),
    it('should return with a 404 status code if a potentially valid resource is not found', (done) => {
        chai.request(server)
        .get('/v1/targets/111111')
        .end((error, response) => {
            response.statusCode.should.be.eql(404)
        })
        done()
    }),
    it('should return with a 400 status code if an invalid resource is queried for', (done) => {
        chai.request(server)
        .get('/v1/targets/ae!ou:')
        .end((error, response) => {
            response.statusCode.should.be.eql(400)
        })
        done()
    }),
    it('should return an object', (done) => {
        chai.request(server)
        .get('/v1/targets')
        .end((error, response) => {
            response.body.should.be.a('object')
            done()
        })
    }),
    it('should return an array of objects', (done) => {
        chai.request(server)
        .get('/v1/targets')
        .end((error, response) => {
            response.body.should.have.property('data')
            response.body.data.should.be.a('array')
            done()
        })
    }),
    it('should have an array containing at least one object', (done) => {
        chai.request(server)
        .get('/v1/targets')
        .end((error, response) => {
            response.body.data[0].should.be.a('object')
            response.body.data.length.should.be.gt(0)
            done()
        })
    }),
    it('should be able to query a single target by its id', (done) => {
        chai.request(server)
        .get('/v1/targets')
        .end((error, response) => {
            const targetId = response.body.data[0].target_id
            chai.request(server)
            .get('/v1/targets/' + targetId)
            .end((error, response) => {
                response.body.data.should.be.a('object')
                response.body.data.target_id.should.be.deep.eql(targetId)
                done()
            })
        done()
        })
    })
})
