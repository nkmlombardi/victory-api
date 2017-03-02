const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const expressJwt = require('express-jwt')
const authJwt = expressJwt({ secret: process.env.API_SECRET })
const passport = require('passport')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const handlers = require('../handlers')
const utility = require('../utilities')
const database = require('../../database').state

passport.use(new Strategy({
    secretOrKey: process.env.API_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    passReqToCallback: true
},
    async (request, payload, callback) => {
        // Save the JWT from the header
        const jwt_auth_token = request.headers.authorization.split(' ')[1]

        // Verify the JWT appears in auth, is a legitimate token, and hasn't been manipulated
        jwt.verify(jwt_auth_token, process.env.API_SECRET, async (error, decoded) => {
            if (error) return callback(null, null, new ApiError(4007))

            // Check if client making the request has the same IP as when they were logged in before
            if (request.client_ip_addr !== decoded.user_ip) return callback(null, null, new ApiError(4006))
            token = await database.models.Passport.findOne({ where: { jwt_token: jwt_auth_token } })

            if (!token) return callback(null, null, new ApiError(5002))

            // If the token was soft deleted, it's no longer valid
            if (token.deleted_at) return callback(null, null, new ApiError(4005))

            // If the token hasn't been used in 6 hours, soft delete it
            if (!moment(moment(token.updated_at).format()).isAfter(moment().subtract(6, 'hours').format())) {
                token.destroy()
                return callback(null, null, new ApiError(4005))
            }

            // Check if user is verified
            let user_temp = await database.models.User.findOne({ where: { id: token.user_id } })
            if (!user_temp.verified) {
                return callback(null, null, new ApiError(6003))
            }
            // If all is well, return the payload
            return callback(null, decoded, false)
        })
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('jwt', (info, user, error) => {
        // Check to see if it's an error we returned
        if (error instanceof ApiError) {
            if (error.message) return handlers.error(error, (status, payload) => response.status(status).json(payload))
            return handlers.error((error.code || error), (status, payload) => response.status(status).json(payload))
        }
        token.changed('updated_at', true).save()
        return next()
    })(request, response, next)
}
