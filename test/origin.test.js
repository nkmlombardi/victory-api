process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../server')

chai.use(chaiHttp)

describe('Origins', () => {
    it('should successfully return a 200 HTTP status code', (done) => {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            response.statusCode.should.be.eql(200)
            done()
        })
    })
    it('should return with a 404 status code if a potentially valid resource is not found', (done) => {
        chai.request(server)
        .get('/v1/origins/1231551555')
        .end((error, response) => {
            response.statusCode.should.be.eql(404)
        })
        done()
    })
    it('should return with a 400 status code if an invalid resource is queried for', (done) => {
        chai.request(server)
        .get('/v1/origins/sdaf213')
        .end((error, response) => {
            response.statusCode.should.be.eql(400)
        })
        done()
    })
    it('should return an object', (done) => {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            response.body.should.be.a('object')
            done()
        })
    }),
    it('the object should have a data array of objects', (done) => {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            response.body.should.have.property('data')
            response.body.data.should.be.a('array')
            done()
        })
    }),
    it('should have an array containing at least one origin object', (done) => {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            response.body.data[0].should.be.a('object')
            response.body.data.length.should.be.gt(0)
            done()
        })
    }),
    it('should be able to query a single origin by its id', (done) => {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            const originId = response.body.data[0].origin_id
            chai.request(server)
            .get('/v1/origins/' + originId)
            .end((error, response) => {
                response.body.data.should.be.a('object')
                response.body.data.id.should.be.deep.eql(originId)
            })
        done()
        })
    }),
    it('should return targets for a specified origin', (done) => {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            const originId = response.body.data[0].origin_id
            chai.request(server)
            .get('/v1/origins/' + originId + '/targets')
            .end((error, response) => {
                response.body.data.should.have.length.gt(0)
                response.body.data[0].should.be.a('object')
                response.body.data[0].origin_id.should.be.deep.eql(originId)
            })
            done()
        })
    }),
    it.skip('should return origin health', (done) => {
        chai.request(server)
        .get('/v1/origins/health')
        .end((error, response) => {
            response.body.should.have.property('status')
            response.body.data.should.have.length.gt(0)
            response.body.data[0].should.be.a('object')
            response.body.data[0].should.have.property('health')
            response.body.data[0].health.should.be.a('int')
            done()
        })
    }),
    it.skip('should return health for specified origin', (done) => {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            const originId = response.body.data[0].origin_id
            chai.request(server)
            .get('/v1/origins/' + originId + '/health')
            .end((error, response) => {
                response.body.should.have.property('status')
                response.body.status.should.be.eql(200)
                response.body.data.should.have.length.gt(0)
                response.body.data[0].should.be.a('object')
                response.body.data[0].should.have.property('health')
                response.body.data[0].health.should.be.a('int')
                done()
            })
        })
    })
})
