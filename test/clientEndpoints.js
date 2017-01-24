process.env.NODE_ENV = 'test'

var plyfil = require('babel-polyfill')

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../server')
chai.use(chaiHttp)

describe('Clients', () => {
    it('should return an object containing a success status', function(done) {
        chai.request(server)
        .get('/v1/clients')
        .end((err, res) => {
            res.body.should.be.a('object')
            res.body.should.have.property('status').eql('success')
            done(err)
        })
    }),
    it('should return an array of objects', function (done) {
        chai.request(server)
        .get('/v1/clients')
        .end((err, res) => {
            res.body.should.have.property('data')
            res.body.data.should.be.a('array')
            done(err)
        })
    }),
    it('should have an array containing at least one object', function (done) {
        chai.request(server)
        .get('/v1/clients')
        .end((err, res) => {
            res.body.data[0].should.be.a('object')
            res.body.data.length.should.be.gt(0)
            done(err)
        })
    }),
    it('should be able to query a single client by its id', function (done) {
        chai.request(server)
        .get('/v1/clients')
        .end((err, res) => {
            var clientId =  + res.body.data[0].client_id
            chai.request(server)
            .get('/v1/clients/' + clientId)
            .end((err, res) => {
                res.body.data[0].should.be.a('object')
                res.body.data[0].client_id.should.be.deep.eql(clientId)
                done()
            })
        })
    })
})
