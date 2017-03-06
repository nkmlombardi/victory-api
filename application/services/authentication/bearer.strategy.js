const passport = require('passport')
const Strategy = require('passport-http-bearer').Strategy
const moment = require('moment')
const database = require('../../database').state
const handlers = require('../handlers')
passport.use(new Strategy({ passReqToCallback: true },
    async (request, auth_token, callback) => {
        try {
            // Look for a passport with the matching token
            token = await request.models.Passport.findOne({ where: { auth_token } })

            // If token isn't found, return an error
            if (!token) {
                return callback(null, null, new ApiError(5002))
            }

            // Check if the token has been accessed in the last 30 seconds
            if (!moment(moment(token.updated_at).format()).isAfter(moment().subtract(30, 'seconds').format()))
                return callback(null, null, new ApiError(4005))
            user = await database.models.User.findOne({ where: { id: token.user_id } })
            if (!user)
                return callback(null, null, new ApiError(4004))
        } catch (error) {
            return callback(error, null, null)
        }
        return callback(false, user, null)
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('bearer', function (error, user, info) {
        // If we have an error, check and see if the message is an error code,
        // if so, throw that custom error, if not, throw default catch all error

        if (error instanceof ApiError) {
            if (error.message) return handlers.error(error, (status, payload) => response.status(status).json(payload))
            return handlers.error((error.code || error), (status, payload) => response.status(status).json(payload))
        }
        token.changed('updated_at', true).save()
        return next()
    })(request, response, next)
}
