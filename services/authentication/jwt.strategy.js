const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const expressJwt = require('express-jwt')
const authJwt = expressJwt({ secret: process.env.API_SECRET })
const passport = require('passport')
const jwt = require('jsonwebtoken')
const moment = require('moment')

passport.use(new Strategy({
    secretOrKey: process.env.API_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    iss: 'api.onelink.com',
    sub: 'api_user',
    aud: 'noc.onelink.com',
    passReqToCallback: true
},
    async (request, payload, callback) => {
        // Save the JWT from the header
        const jwt_auth_token = request.headers.authorization.split(' ')[1]
        jwt.verify(jwt_auth_token, process.env.API_SECRET, async (error, decoded) => {
            if (request.client_ip_addr !== decoded.user_ip) return callback(null, null, Error('4006'))
            console.log(decoded)

            // If all is well, return the user_id
            return callback(null, decoded, false)
        })
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('jwt', (info, user, error) => {

        // If we have an error, check and see if the message is an error code,
        // if so, throw that custom error, if not, throw default catch all error
        if (error) {
            if (!isNaN(error.message)) error.message = Number(error.message)
            return response.handlers.error(error.message, request, response)
        }

        return next()
    })(request, response, next)
}
