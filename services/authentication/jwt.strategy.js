const bcrypt = require('bcryptjs')
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

        // Does not work without async; attempts to verify the integrity of the JWT
        // if it works, verify the IP in the token against client IP, else errors
        jwt.verify(jwt_auth_token, process.env.API_SECRET, async (error, decoded) => {
            if (!bcrypt.compareSync(request.client_ip_addr, decoded.user_ip)) return callback(null, null, Error('4006'))


            // Attempt to generate a token from the passport that has a matching JWT
            token = await request.models.Passport.findOne({ where: { jwt_token: jwt_auth_token } })

            if (!token) return callback(null, null, Error('4004'))

            // Check if the token was last accessed within 30 seconds; if not, it's expired
            if (!moment(moment(token.updated_at).format()).isAfter(moment().subtract(30, 'seconds').format()))
                return callback(null, null, Error('4005'))

            // If all is well, return the user_id
            return callback(null, token.user_id, false)
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

        // Touch the token to refresh it
        token.changed('updated_at', true).save()

        return next()
    })(request, response, next)
}
