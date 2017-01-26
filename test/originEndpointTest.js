process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../server')
chai.use(chaiHttp)

describe('Origins', () => {
    it('should return an object containing a success status', function(done) {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            response.body.should.be.a('object')
            response.body.should.have.property('status').eql('success')
            done(error)
        })
    }),
    it('the object should have a data array of objects', function(done) {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            response.body.should.have.property('data')
            response.body.data.should.be.a('array')
            done(error)
        })
    }),
    it('should have an array containing at least one origin object', function(done) {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            response.body.data[0].should.be.a('object')
            response.body.data.length.should.be.gt(0)
            done(error)
        })
    }),
    it('should be able to query a single origin by its id', function (done) {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            var originId =  + response.body.data[0].origin_id
            chai.request(server)
            .get('/v1/origins/' + originId)
            .end((error, response) => {
                response.body.data[0].should.be.a('object')
                response.body.data[0].origin_id.should.be.deep.eql(originId)
                done()
            })
        })
    }),
    it('should return targets for a specified origin', function(done) {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            var originId =  + response.body.data[0].origin_id
            chai.request(server)
            .get('/v1/origins/' + originId + '/targets')
            .end((error, response) => {
                response.body.should.have.property('status')
                response.body.status.should.be.eql('success')
                response.body.data.should.have.length.gt(0)
                response.body.data[0].should.be.a('object')
                response.body.data[0].origin_id.should.be.deep.eql(originId)
                done()
            })
        })
    }),
    it.skip('should return origin health', function(done) {
        chai.request(server)
        .get('/v1/origins/health')
        .end((error, response) => {
            response.body.should.have.property('status')
            response.body.status.should.be.eql('success')
            response.body.data.should.have.length.gt(0)
            response.body.data[0].should.be.a('object')
            response.body.data[0].should.have.property('health')
            response.body.data[0].health.should.be.a('int')
            done()
        })
    }),
    it.skip('should return health for specified origin', function(done) {
        chai.request(server)
        .get('/v1/origins')
        .end((error, response) => {
            var originId =  + response.body.data[0].origin_id
            chai.request(server)
            .get('/v1/origins/' + originId + '/health')
            .end((error, response) => {
                response.body.should.have.property('status')
                response.body.status.should.be.eql('success')
                response.body.data.should.have.length.gt(0)
                response.body.data[0].should.be.a('object')
                response.body.data[0].should.have.property('health')
                response.body.data[0].health.should.be.a('int')
                done()
            })
        })
    })
})
