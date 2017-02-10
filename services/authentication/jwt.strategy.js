const secret = require('./.secret.key').secretKey
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const expressJwt = require('express-jwt')
const authJwt = expressJwt({ secret: secret })
const errorLogger = require('../logger/file.logger').errorLogger
const passport = require('passport')
const jwt = require('jsonwebtoken')
let jwtString
let user_id = false
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
                if (err) return err
                    console.log('2verification worked, issuer: ', decoded.iss)
                return decoded.iss
            })
        } catch (error) {
            console.log('3 problem with verification of JWT')
        }
        try {
            token = await request.models.Passport.findOne({ where: { jwt_token: jwtString } })
            if (!token) return console.log('failed getting token from passport')
            console.log('got token from passport')
        } catch (error) {
            console.log('3 errors w/ passport token: ', error)
        }
        (token ? console.log('3 passport works and returns a valid object') : console.log('3 passport fails'))


        console.log('4 jwt.verify passes')

        return callback(null, token.user_id, console.log('it\'s alive!'))
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('jwt', (error, user, info) => {
        console.log('5 inside jwt export')
        console.log('6 error?: ', error)
        console.log('7 info: ', info)
        console.log('8 user: ', user)
        if (!user) {
            return response.handlers.error(4005, request, response)
        }
        return next()
    })(request, response, next)
}
