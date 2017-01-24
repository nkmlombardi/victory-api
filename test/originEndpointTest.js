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
        .end((err, res) => {
            res.body.should.be.a('object')
            res.body.should.have.property('status').eql('success')
            done(err)
        })
    }),
    it('the object should have a data array of objects', function(done) {
        chai.request(server)
        .get('/v1/origins')
        .end((err, res) => {
            res.body.should.have.property('data')
            res.body.data.should.be.a('array')
            done(err)
        })
    }),
    it('should have an array containing at least one origin object', function(done) {
        chai.request(server)
        .get('/v1/origins')
        .end((err, res) => {
            res.body.data[0].should.be.a('object')
            res.body.data.length.should.be.gt(0)
            done(err)
        })
    }),
    it('should be able to query a single origin by its id', function (done) {
        chai.request(server)
        .get('/v1/origins')
        .end((err, res) => {
            var originId =  + res.body.data[0].origin_id
            chai.request(server)
            .get('/v1/origins/' + originId)
            .end((err, res) => {
                res.body.data[0].should.be.a('object')
                res.body.data[0].origin_id.should.be.deep.eql(originId)
                done()
            })
        })
    }),
    it('should return targets for a specified origin', function(done) {
        chai.request(server)
        .get('/v1/origins')
        .end((err, res) => {
            var originId =  + res.body.data[0].origin_id
            chai.request(server)
            .get('/v1/origins/' + originId + '/targets')
            .end((err, res) => {
                res.body.should.have.property('status')
                res.body.status.should.be.eql('success')
                res.body.data.should.have.length.gt(0)
                res.body.data[0].should.be.a('object')
                res.body.data[0].origin_id.should.be.deep.eql(originId)
                done()
            })
        })
    }),
    it.skip('should return origin health', function(done) {
        chai.request(server)
        .get('/v1/origins/health')
        .end((err, res) => {
            res.body.should.have.property('status')
            res.body.status.should.be.eql('success')
            res.body.data.should.have.length.gt(0)
            res.body.data[0].should.be.a('object')
            res.body.data[0].should.have.property('health')
            res.body.data[0].health.should.be.a('int')
            done()
        })
    }),
    it.skip('should return health for specified origin', function(done) {
        chai.request(server)
        .get('/v1/origins')
        .end((err, res) => {
            var originId =  + res.body.data[0].origin_id
            chai.request(server)
            .get('/v1/origins/' + originId + '/health')
            .end((err, res) => {
                res.body.should.have.property('status')
                res.body.status.should.be.eql('success')
                res.body.data.should.have.length.gt(0)
                res.body.data[0].should.be.a('object')
                res.body.data[0].should.have.property('health')
                res.body.data[0].health.should.be.a('int')
                done()
            })
        })
    })
})
