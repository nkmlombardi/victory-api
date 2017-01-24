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
        .end((err, res) => {
            res.body.should.be.a('object')
            res.body.should.have.property('status').eql('success')
            done(err)
        })
    }),
    it('should return an array of objects', function (done) {
        chai.request(server)
        .get('/v1/datacenters')
        .end((err, res) => {
            res.body.should.have.property('data')
            res.body.data.should.be.a('array')
            done(err)
        })
    }),
    it('should have an array containing at least one object', function (done) {
        chai.request(server)
        .get('/v1/datacenters')
        .end((err, res) => {
            res.body.data[0].should.be.a('object')
            res.body.data.length.should.be.gt(0)
            done(err)
        })
    }),
    it('should be able to query a single datacenter by its id', function (done) {
        chai.request(server)
        .get('/v1/datacenters')
        .end((err, res) => {
            res.body.should.have.property('data')
            res.body.data.should.be.a('array')
            res.body.data[0].should.have.property('data_center_code')
            var datacenterCode =  res.body.data[0].data_center_code
            chai.request(server)
            .get('/v1/datacenters/' + datacenterCode)
            .end((err, res) => {
                res.body.should.have.property('data')
                res.body.data.should.have.property('data_center_code')
                res.body.data.data_center_code.should.be.deep.eql(datacenterCode)
                done()
            })
        })
    }),
    it('should be able to get a cluster from a datacenter id', function (done) {
        chai.request(server)
        .get('/v1/datacenters')
        .end((err, res) => {
            var datacenterCode =  res.body.data[0].data_center_code
            chai.request(server)
            .get('/v1/datacenters/' + datacenterCode + '/clusters')
            .end((err, res) => {
                res.body.should.have.property('status')
                res.body.status.should.eql('success')
                res.body.should.have.property('data')
                res.body.data.should.be.a('array')
                res.body.data.length.should.be.gt(0)
                for (var i = 0; i < res.body.data.length; i ++) {
                    res.body.data[i].data_center.should.be.eql(datacenterCode)
                }
                done()
            })
        })
    })
})
