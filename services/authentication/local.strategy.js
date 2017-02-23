const passport = require('passport')
const Strategy = require('passport-local').Strategy

passport.use(new Strategy({ usernameField: 'email', passReqToCallback: true },
    async (request, email, password, callback) => {
        try {
            let user = await request.models.User.findOne({ where: { email } })
            if (!user) {
                return callback(null, null, new ApiError(4004))
            }
            user.verifyPassword(password, (error, isMatch) => {
                // If error or password doesn't match
                if (error) return callback(null, null, new ApiError(5003))
                if (!isMatch) return callback(null, null, new ApiError(4004))
                request.strategy = 'local'
                request.user = user
                return callback(null, user, false)
            })
        } catch (error) {
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
        return next()
    })(request, response, next)
}
