const secrets = require('./.secrets')
const secretKey = secrets.secretKey
const ip_hash = secrets.ip_hash
const random_ip = secrets.random_ip
const bcrypt = require('bcryptjs')
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const expressJwt = require('express-jwt')
const authJwt = expressJwt({ secret: secretKey })
const errorLogger = require('../logger/file.logger').errorLogger
const passport = require('passport')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const parameters = {
    secretOrKey: secretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    iss: 'api.onelink.com',
    sub: 'api_user',
    aud: 'noc.onelink.com',
    passReqToCallback: true
}

passport.use(new Strategy(parameters,
    async (request, payload, callback) => {
        // when we get IP from requests working, use this:
        // valid_ip = bcrypt.compareSync(request.header['x-forwarded-for'][0], ip_hash)
        try {
            verified = await jwt.verify(request.headers.authorization.split(' ')[1], secretKey, (err, decoded) => {
                if (decoded) {
                    request.verify = true
                    console.log(decoded.user_ip)
                    request.ip_hash = decoded.user_ip
                    console.log(request.ip_hash)
                } else {
                    request.verify = false
                }
            })
        } catch (error) {
            request.verify = false
            return callback(null, false)
        }
        // When IP address is working, use this
        //
        // if (bcrypt.compareSync(random_ip, ip_hash) || bcrypt.compareSync(request.header['x-forwarded-for'][0], ip_hash)) {
        //
        // For now, this will just work
        console.log('comparing hashes: ', request.client_ip_addr, ' \n', request.ip_hash)
        if (bcrypt.compareSync(request.client_ip_addr, request.ip_hash)) {
            console.log('ip valid')
            request.valid_ip = true
        } else {
            console.log('ip not valid')
            request.valid_ip = false
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
        let cutOff
        let tokenUpdate
        let expired

        if (token) {
            cutOff = moment().subtract(30, 'seconds').format()
            tokenUpdate = moment(token.updated_at).format()
            expired = !moment(tokenUpdate).isAfter(cutOff)
        }

        if (typeof request.headers.authorization == 'undefined')
            return response.handlers.error(4008, request, response)

        if (request.headers.authorization.split(' ')[0] != 'JWT')
            return response.handlers.error(4008, request, response)

        if (request.verify !== true)
            return response.handlers.error(4007, request, response)

        if (request.valid_ip !== true)
            return response.handlers.error(4006, request, response)

        if (request.token_exists !== true)
            return response.handlers.error(4004, request, response)

        if (expired)
            return response.handlers.error(4005, request, response)

        token.changed('updated_at', true).save()
        return next()
    })(request, response, next)
}
