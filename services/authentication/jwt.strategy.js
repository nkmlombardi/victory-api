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
        try {
            jwt.verify(request.headers.authorization.split(' ')[1], secret, (err, decoded) => {
                if (decoded) {
                    request.verify = true
                } else {
                    request.verify = false
                }
            })
        } catch (error) {
            request.verify = false
            return callback(null, false)
        }
        try {
            request.token_exists = true
            token = await request.models.Passport.findOne({
                where: {
                    jwt_token: request.headers.authorization.split(' ')[1]
                }
            })
            if (!token) {
                request.token_exists = false
                return callback(null, false)
            }
        } catch (error) {
            return callback(null, false)
        }

        return callback(null, token.user_id, errorLogger.log('error', 'error in passport JWT strategy'))
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('jwt', (info, user, error) => {
        if (token) {
            cutOff = moment().subtract(30, 'seconds').format()
            tokenUpdate = moment(token.updated_at).format()
            expired = !moment(tokenUpdate).isAfter(cutOff)
        }
        if (typeof request.headers.authorization == 'undefined') return response.handlers.error(4008, request, response)
        if (request.headers.authorization.split(' ')[0] != 'JWT') return response.handlers.error(4008, request, response)
        if (request.verify !== true) return response.handlers.error(4007, request, response)
        if (request.token_exists !== true) return response.handlers.error(4004, request, response)
        if (expired) return response.handlers.error(4005, request, response)
        token.changed('updated_at', true).save()
        return next()
    })(request, response, next)
}
