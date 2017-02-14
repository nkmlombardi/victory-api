const bcrypt = require('bcryptjs')
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const expressJwt = require('express-jwt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const moment = require('moment')

// TODO: Maybe remove
const authJwt = expressJwt({ secret: process.env.API_SECRET })


passport.use(new Strategy({
    secretOrKey: process.env.API_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    iss: 'api.onelink.com',
    sub: 'api_user',
    aud: 'noc.onelink.com',
    passReqToCallback: true
}, async (request, payload, callback) => {
        // Validate the format of the token in the HTTP header
        if (typeof request.headers.authorization === 'undefined') return callback(null, false, { code: 4008 })
        if (request.headers.authorization.split(' ')[0] !== 'JWT') return callback(null, false, { code: 4008 })

        // Verify the integrity of the token
        jwt.verify(request.headers.authorization.split(' ')[1], process.env.API_SECRET, async (error, decoded) => {
            if (error) return callback(null, false, { code: 4007 })

            // Validate the client's IP against the token's cryptographically stored IP
            if (!bcrypt.compareSync(request.client_ip_addr, decoded.user_ip)) return callback(null, false, { code: 4006 })

            // Find the associated JWT token
            let token

            // Find the token in the database
            try {
                token = await request.models.Passport.findOne({ where: { jwt_token: request.headers.authorization.split(' ')[1] } })
            } catch (error) {
                return callback(null, false, { code: 5000, message: error })
            }

            // Return error if token does not exist
            if (!token) return callback(null, false, { code: 4004 })

            // Check if token is expired
            const expires = moment(token.updated_at).add(30, 'seconds')
            if (expires.isBefore(moment())) return callback(null, false, { code: 4005 })

            // Refresh token and return it
            token.changed('updated_at', true).save()
            return callback(null, token.user_id)
        })
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('jwt', (info, user, error) => {
        // Catch errors
        if (error) return response.handlers.error(error.code, request, response)

        // Continue
        return next()
    })(request, response, next)
}
