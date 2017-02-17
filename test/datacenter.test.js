process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../server')

chai.use(chaiHttp)

describe('Datacenters', () => {
    it('should successfully return a 200 HTTP status code', (done) => {
        chai.request(server)
        .get('/v1/datacenters')
        .end((error, response) => {
            response.statusCode.should.be.eql(200)
            done()
        })
    })
    it('should return with a 404 status code if a potentially valid resource is not found', (done) => {
        chai.request(server)
        .get('/v1/datacenters/ASFASG-:')
        .end((error, response) => {
            response.statusCode.should.be.eql(404)
        })
        done()
    })
    it('should return with a 400 status code if an invalid resource is queried for', (done) => {
        chai.request(server)
        .get('/v1/datacenters/ASDASafa:dd-gsa')
        .end((error, response) => {
            response.statusCode.should.be.eql(400)
        })
        done()
    })
    it('should return an object', (done) => {
        chai.request(server)
        .get('/v1/datacenters')
        .end((error, response) => {
            response.body.should.be.a('object')
            done()
        })
    }),
    it('should return an array of objects', (done) => {
        chai.request(server)
        .get('/v1/datacenters')
        .end((error, response) => {
            response.body.should.have.property('data')
            response.body.data.should.be.a('array')
            done()
        })
    }),
    it('should have an array containing at least one object', (done) => {
        chai.request(server)
        .get('/v1/datacenters')
        .end((error, response) => {
            response.body.data[0].should.be.a('object')
            response.body.data.length.should.be.gt(0)
            done()
        })
    }),
    it('should be able to query a single datacenter by its id', (done) => {
        chai.request(server)
        .get('/v1/datacenters')
        .end((error, response) => {
            response.body.should.have.property('data')
            response.body.data.should.be.a('array')
            response.body.data[0].should.have.property('data_center_code')
            const datacenterCode =  response.body.data[0].data_center_code
            chai.request(server)
            .get('/v1/datacenters/' + datacenterCode)
            .end((error, response) => {
                response.body.should.have.property('data')
                response.body.data.should.be.a('object')
                response.body.data.should.have.property('data_center_code')
                response.body.data.data_center_code.should.be.deep.eql(datacenterCode)
                done()
            })
        })
    }),
    it('should be able to get a cluster from a datacenter id', (done) => {
        chai.request(server)
        .get('/v1/datacenters')
        .end((error, response) => {
            const datacenterCode =  response.body.data[0].data_center_code
            chai.request(server)
            .get('/v1/datacenters/' + datacenterCode + '/clusters')
            .end((error, response) => {
                response.body.should.have.property('data')
                response.body.data.should.be.a('array')
                response.body.data.length.should.be.gt(0)
                for (let i = 0; i < response.body.data.length; i += 1) {
                    response.body.data[i].data_center.should.be.eql(datacenterCode)
                }
                done()
            })
        })
    })
})
