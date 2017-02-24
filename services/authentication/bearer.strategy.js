const passport = require('passport')
const Strategy = require('passport-http-bearer').Strategy
const moment = require('moment')

passport.use(new Strategy({ passReqToCallback: true },
    async (request, auth_token, callback) => {
        try {
            // Look for a passport with the matching token
            token = await request.models.Passport.findOne({ where: { auth_token } })

            // If token isn't found, return an error
            if (!token) {
                return callback(Error('5002'), null, null)
            }

            // Check if the token has been accessed in the last 30 seconds
            if (!moment(moment(token.updated_at).format()).isAfter(moment().subtract(30, 'seconds').format()))
                return callback(Error('4005'), null, null)
            user = await request.models.User.scope('public').findOne({ where: { id: token.user_id } })
            if (!user)
                return callback(Error('4004'), null, null)
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

        if (error) {
            if (!isNaN(error.message)) error.message = Number(error.message)
            return response.handlers.error(error.message, request, response)
        }
        if (token) token.changed('updated_at', true).save()
        return next()
    })(request, response, next)
}
