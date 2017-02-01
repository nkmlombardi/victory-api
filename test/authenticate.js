process.env.NODE_ENV = 'test'

var plyfil = require('babel-polyfill')
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../server')
let expect = require('expect.js')
let stRequest = require('supertest').agent('http://localhost:3000')


chai.use(chaiHttp)
describe('authencation should work', function () {
    xit('should post the authentication', function (done) {
        stRequest
            .post('/v1/authenticate')
            .send({
                email: "onelink",
                password: "onelink"
            })
            .set('Accept', 'application/json')
            .end(function (error, response) {
                response.status.should.be.eql(200)
                done()
            })
    })
})
