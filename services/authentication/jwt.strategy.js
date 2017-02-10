const secret = require('./.secret.key').secretKey
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const expressJwt = require('express-jwt')
const authJwt = expressJwt({ secret: secret })
const errorLogger = require('../logger/file.logger').errorLogger
const passport = require('passport')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const decipher = crypto.createDecipher('aes192', secret)
let jwtString
let user_id = false
let verify
let token = false
let ipValid = false
let noJWT = false
const parameters = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    iss: 'api.onelink.com',
    sub: 'api_user',
    aud: 'noc.onelink.com',
    passReqToCallback: true
}

passport.use(new Strategy(parameters,
    async (request, payload, callback) => {
        if (request.headers.authorization.split(' ')[0] !== 'JWT') {
            noJWT = true
            return callback(null, false, console.log('JWT not found in header'))
        }
        jwtString = request.headers.authorization.split(' ')[1]
        console.log('1 got the JWT from header')
        try {
            jwt.verify(jwtString, secret, (err, decoded) => {
                if (err) {
                    verify = false
                    return verify
                } else {
                    verify = false
                    return verify
                }
            })
        } catch (error) {
            console.log('3 problem with verification of JWT')
        }
        try {
            token = await request.models.Passport.findOne({ where: { jwt_token: jwtString } })
            if (!token) {
                return callback(null, false, console.log('legit token, doesn\'t match any in passport though'))
            }
            console.log('got token from passport')
        } catch (error) {
            console.log('3 errors w/ passport token: ', error)
        }

        return callback(null, token.user_id, console.log('jwt strategy executes callback'))
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('jwt', (error, user, info) => {
        console.log('5 inside jwt export')
        console.log('6 error?: ', error)
        console.log('7 info: ', info)

        console.log('8 user: ', user)
        console.log('9 !token: ', !token)
        console.log('10 verify: ', verify)
        if (noJWT == true) return response.handlers.error(4007, request, response)
        if (!token && verify) return response.handlers.error(4008, request, response)
        if (!verify && !user) return response.handlers.error(4007, request, response)

        return next()
    })(request, response, next)
}
