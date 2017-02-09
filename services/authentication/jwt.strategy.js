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
    async (payload, callback) => {
        jwtString = payload.headers.authorization.split(' ')[1]
        try {
            token = await payload.models.Passport.findOne({ where: { jwt_token: jwtString } })
        } catch (error) {

        }
        (token ? console.log('passport works and returns a valid object') : console.log('passport fails'))
        jwt.verify(jwtString, secret, (err, decoded) => {
            if (err) return console.log('error verifying JWT')
            console.log('callback', callback)
            return token.user_id
        })
        console.log('jwt.verify passes')


        return callback
    }
))

// passport.authenticate('jwt', { session: false }), function(req, res) { res.send(req.user.profile) }

module.exports = passport.authenticate('jwt', { session: false}), function (response, callback) {
        console.log('export from jwt')
        return token.user_id
    }
