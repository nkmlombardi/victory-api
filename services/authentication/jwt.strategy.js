const secret = require('./.secret.key').secretKey
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const expressJwt = require('express-jwt')
const authJwt = expressJwt({ secret: secret })
const errorLogger = require('../logger/file.logger').errorLogger
const passport = require('passport')
const jwt = require('jsonwebtoken')

const parameters = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    iss: 'api.onelink.com',
    sub: 'api_user',
    aud: 'noc.onelink.com',
    passReqToCallback: true
}

passport.use(new Strategy(parameters,
    async (payload, callback) => {
        console.log('inside jwt pass1')
        console.log('payload.header.auth', payload.headers.authorization.split(' ')[1])
        jwt.verify('ets', secret, (err, decoded) => {
            if (err) return console.log('error')
            var user = users[decoded.id]
            return callback(null, user ? user : false)
        })
        console.log('inside jwt pass2')
        token = await payload.models.Passport.findOne({ where: { jwt_token: payload.headers.authorization.split(' ')[1] } })

        console.log('inside jwt pass3')

        return callback
    }
))

module.exports = function (payload, callback, next) {
    passport.authenticate('jwt', { session: false}), function (response, callback) {

        console.log('export from jwt')
        // console.log(payload)
        // will generate a 500 error
        // if (error) return errorLogger.log('error', '\n\t\tMessage: ', error)

        // wrong user/pass combo
        // if (!payload) return errorLogger.log('payload', '\n\t\tMessage: ', payload)
    }(payload, callback, next)
}
