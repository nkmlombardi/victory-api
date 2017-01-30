var passport = require('passport')
var strategy = require('passport-local').Strategy

passport.use(new strategy({ usernameField: 'email', passReqToCallback: true },
    async function(request, response, email, password, callback) {
        try {
            var user = await request.models.User.findOne({
                where: {
                    email: email
                }
            })
        } catch(error) {
            return response.errorHandler(5004, request, response)
        }

        // If no user was returned from query
        if (!user) { return callback(null, false) }

        // Verify the password that was provided
        user.verifyPassword(password, function(error, isMatch) {

            // If error or password doesn't match
            //if (error) return callback(error)
            if (!isMatch) {
                callback(null, false)
            }

            // If password was correct
            request.strategy = 'local'
            return callback(null, user)
        })
    }
))

module.exports = passport.authenticate(['local'], { session: false })
