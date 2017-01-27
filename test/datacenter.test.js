process.env.NODE_ENV = 'test'

var plyfil = require('babel-polyfill')

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../server')
chai.use(chaiHttp)

describe('Datacenters', () => {
    it('should return an object containing a success status', function(done) {
        chai.request(server)
        .get('/v1/datacenters')
        .end((error, response) => {
            response.body.should.be.a('object')
            response.body.should.have.property('status').eql(200)
            done(error)
        })
    }),
    it('should return an array of objects', function (done) {
        chai.request(server)
        .get('/v1/datacenters')
        .end((error, response) => {
            response.body.should.have.property('data')
            response.body.data.should.be.a('array')
            done(error)
        })
    }),
    it('should have an array containing at least one object', function (done) {
        chai.request(server)
        .get('/v1/datacenters')
        .end((error, response) => {
            response.body.data[0].should.be.a('object')
            response.body.data.length.should.be.gt(0)
            done(error)
        })
    }),
    it('should be able to query a single datacenter by its id', function (done) {
        chai.request(server)
        .get('/v1/datacenters')
        .end((error, response) => {
            response.body.should.have.property('data')
            response.body.data.should.be.a('array')
            response.body.data[0].should.have.property('data_center_code')
            var datacenterCode =  response.body.data[0].data_center_code
            chai.request(server)
            .get('/v1/datacenters/' + datacenterCode)
            .end((error, response) => {
                response.body.should.have.property('data')
                response.body.data.should.be.a('array')
                response.body.data[0].should.have.property('data_center_code')
                response.body.data[0].data_center_code.should.be.deep.eql(datacenterCode)
                done()
            })
        })
    }),
    it('should be able to get a cluster from a datacenter id', function (done) {
        chai.request(server)
        .get('/v1/datacenters')
        .end((error, response) => {
            var datacenterCode =  response.body.data[0].data_center_code
            chai.request(server)
            .get('/v1/datacenters/' + datacenterCode + '/clusters')
            .end((error, response) => {
                response.body.should.have.property('status')
                response.body.status.should.eql(200)
                response.body.should.have.property('data')
                response.body.data.should.be.a('array')
                response.body.data.length.should.be.gt(0)
                for (var i = 0; i < response.body.data.length; i ++) {
                    response.body.data[i].data_center.should.be.eql(datacenterCode)
                }
                done()
            })
        })
    })
})
