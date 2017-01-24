var plyfil = require('babel-polyfill')

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../server')
chai.use(chaiHttp)

describe('Clusters', () => {
    it('should return an object containing a success status', function(done) {
        chai.request(server)
        .get('/v1/clusters')
        .end((err, res) => {
            res.body.should.be.a('object')
            res.body.should.have.property('status').eql('success')
            done(err)
        })
    }),
    it('should return an array of objects', function (done) {
        chai.request(server)
        .get('/v1/clusters')
        .end((err, res) => {
            res.body.should.have.property('data')
            res.body.data.should.be.a('array')
            done(err)
        })
    }),
    it('should have an array containing at least one object', function (done) {
        chai.request(server)
        .get('/v1/clusters')
        .end((err, res) => {
            res.body.data[0].should.be.a('object')
            res.body.data.length.should.be.gt(0)
            done(err)
        })
    }),
    it.skip('should be able to query a single cluster by its id', function (done) {
        chai.request(server)
        .get('/v1/clusters')
        .end((err, res) => {
            var clusterName =  + res.body.data[0].cluster_name
            chai.request(server)
            .get('/v1/clusters/' + clusterName)
            .end((err, res) => {
                res.body.data[0].should.be.a('object')
                res.body.data[0].cluster_name.should.be.deep.eql(clusterId)
                done()
            })
        })
    })
})
