process.env.NODE_ENV = 'test'

const plyfil = require('babel-polyfill')

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../server')
chai.use(chaiHttp)

describe('Clusters', () => {
    it('should successfully return a 200 HTTP status code', (done) => {
        chai.request(server)
        .get('/v1/clusters')
        .end((error, response) => {
            response.statusCode.should.be.eql(200)
        })
        done()
    })
    it('should return with a 404 status code if a potentially valid resource is not found', (done) => {
        chai.request(server)
        .get('/v1/clusters/aeiouASF00-lol')
        .end((error, response) => {
            response.statusCode.should.be.eql(404)
        })
        done()
    })
    it('should return with a 400 status code if an invalid resource is queried for', (done) => {
        chai.request(server)
        .get('/v1/clusters/ae!ou:')
        .end((error, response) => {
            response.statusCode.should.be.eql(400)
        })
        done()
    })
    it('should return an object', (done) => {
        chai.request(server)
        .get('/v1/clusters')
        .end((error, response) => {
            response.body.should.be.a('object')
        })
        done()
    }),
    it('object should return an array of objects', (done) => {
        chai.request(server)
        .get('/v1/clusters')
        .end((error, response) => {
            response.body.should.have.property('data')
            response.body.data.should.be.a('array')
        })
        done()
    }),
    it('object should have an array containing at least one object', (done) => {
        chai.request(server)
        .get('/v1/clusters')
        .end((error, response) => {
            response.body.data[0].should.be.a('object')
            response.body.data.length.should.be.gt(0)
        })
        done()
    }),
    it('should be able to query a single cluster by its id', (done) => {
        chai.request(server)
        .get('/v1/clusters')
        .end((error, response) => {
            const clusterName = response.body.data[0].cluster_name
            chai.request(server)
            .get('/v1/clusters/' + clusterName)
            .end((error, response) => {
                response.body.data.should.be.a('object')
                response.body.data.cluster_name.should.be.deep.eql(clusterName)
            })
            done()
        })
    })
})
