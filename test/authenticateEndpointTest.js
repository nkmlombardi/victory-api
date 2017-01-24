process.env.NODE_ENV = 'test'

var plyfil = require('babel-polyfill')

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../server')
chai.use(chaiHttp)

describe('Authentication endpoints', () => {
    it('should return an object trying to authenticate', function(done) {
        chai.request(server)
        .get('/v1/authenticate')
        .end((err, res) => {
            res.body.should.be.a('object')
            done()
        })
    })
})
