const passport = require('passport')
const Strategy = require('passport-local').Strategy
const handlers = require('../handlers')
const database = require('../../database').state
const url = require('url')

passport.use(new Strategy({ usernameField: 'email', passReqToCallback: true },
    async (request, email, password, callback) => {
        try {
            // Look for a user with supplied email
            let user = await database.models.User.findOne({ where: { email } })

            // If they don't exist, error
            if (!user) {
                return callback(null, null, new ApiError(4004))
            }

            if (!user.verified) return callback(null, null, new ApiError(6003))
            // If they do, verify their password
            user.verifyPassword(password, (error, isMatch) => {
                // If error or password doesn't match
                if (error) return callback(null, null, new ApiError(5003))
                if (!isMatch) return callback(null, null, new ApiError(4004))
                return callback(null, user, false)
            })
        } catch (error) {
            console.log('local passport error: ', error)
            return callback(null, null, new ApiError(5004))
        }
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('local', function (info, user, error) {
        if (error instanceof ApiError) {
            if (error.message) return handlers.error(error, (status, payload) => response.status(status).json(payload))
            return handlers.error((error.code || error), (status, payload) => response.status(status).json(payload))
        }
        request.user = user
        return next()
    })(request, response, next)
}
