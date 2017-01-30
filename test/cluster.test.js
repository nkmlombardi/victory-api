process.env.NODE_ENV = 'test'

var plyfil = require('babel-polyfill')

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../server')
chai.use(chaiHttp)

describe('Clusters', () => {
    it('should return an object', function(done) {
        chai.request(server)
        .get('/v1/clusters')
        .end((error, response) => {
            response.body.should.be.a('object')
            done(error)
        })
    }),
    it('object should return an array of objects', function (done) {
        chai.request(server)
        .get('/v1/clusters')
        .end((error, response) => {
            response.body.should.have.property('data')
            response.body.data.should.be.a('array')
            done(error)
        })
    }),
    it('object should have an array containing at least one object', function (done) {
        chai.request(server)
        .get('/v1/clusters')
        .end((error, response) => {
            response.body.data[0].should.be.a('object')
            response.body.data.length.should.be.gt(0)
            done(error)
        })
    }),
    it('should be able to query a single cluster by its id', function (done) {
        chai.request(server)
        .get('/v1/clusters')
        .end((error, response) => {
            var clusterName = response.body.data.cluster_name
            chai.request(server)
            .get('/v1/clusters/' + clusterName)
            .end((error, response) => {
                response.body.data.should.be.a('object')
                response.body.data.cluster_name.should.be.deep.eql(clusterName)
                done()
            })
        })
    })
})
