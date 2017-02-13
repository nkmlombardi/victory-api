const secret = require('./.secret.key').secretKey
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const expressJwt = require('express-jwt')
const authJwt = expressJwt({ secret: secret })
const errorLogger = require('../logger/file.logger').errorLogger
const passport = require('passport')
const jwt = require('jsonwebtoken')
const moment = require('moment')

let jwtString
let user_id = false
let decoded
let token = false
let ipValid = false
let noJWT
let cutOff
let tokenUpdate
let expired

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
        jwtString = request.headers.authorization.split(' ')[1]
        console.log('1 got the JWT from header')
        try {
            jwt.verify(jwtString, secret, (err, decoded) => {
                if (decoded) {
                    request.verify = true
                } else {
                    request.verify = false
                }
            })
        } catch (error) {
            console.log('3 problem with verification of JWT')
        }
        try {
            token = await request.models.Passport.findOne({
                where: {
                    jwt_token: jwtString
                }
            })
            if (!token) {
                request.token_exists = false
                return callback(null, false)
            }
        } catch (error) {
            console.log('3 errors w/ passport token: ', error)
        }

        return callback(null, token.user_id, console.log('jwt strategy executes callback'))
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('jwt', (info, user, error) => {

        if (token) {
            cutOff = moment().subtract(30, 'seconds').format()
            tokenUpdate = moment(token.updated_at).format()
            expired = !moment(tokenUpdate).isAfter(cutOff)
        }
        console.log('decoded', decoded)
        console.log('verify= ', request.verify)
        console.log('expired: ', expired)
        if (request.headers.authorization.split(' ')[0] != 'JWT') return response.handlers.error(4010, request, response)

        if (request.verify !== true) return response.handlers.error(4007, request, response)
        if (expired) return response.handlers.error(4008, request, response)
        token.changed('updated_at', true).save()
        return next()
    })(request, response, next)
}
