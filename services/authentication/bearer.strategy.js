var passport = require('passport')
var strategy = require('passport-http-bearer').Strategy

passport.use(new strategy({ passReqToCallback: true },
    async function(request, auth_token, callback) {
        try {
            var token = await request.models.Passport.findOne({
                where: {
                    auth_token: auth_token
                }
            })
        } catch(error) {
            return response.errorHandler(5002, request, response)
        }

        if (!token) { return callback(null, false); }

        try {
            var user = await request.models.User.scope('public').findOne({
                where: {
                    id: token.user_id
                }
            })
        } catch(error) {
            return response.errorHandler(5003, request, response)
        }

        if (!user) { return callback(null, false) }
        return callback(null, user, { scope: '*' })
    }
))

module.exports = passport.authenticate('bearer', { session: false })
