var passport = require('passport')
var strategy = require('passport-local').Strategy

passport.use(new strategy({ usernameField: 'email', passReqToCallback: true },
    async function(req, email, password, callback) {
        try {
            var user = await req.models.User.findOne({
                where: {
                    email: email
                }
            })
        } catch(error) {
            console.error('Database error retrieving User during local authentication: ', req, email, error)
            return callback(error)
        }

        // If no user was returned from query
        if (!user) { return callback(null, false) }

        // Verify the password that was provided
        user.verifyPassword(password, function(error, isMatch) {

            // If error or password doesn't match
            if (error) { return callback(error) }
            if (!isMatch) { return callback(null, false) }

            // If password was correct
            req.strategy = 'local'
            return callback(null, user)
        })
    }
))

module.exports = passport.authenticate(['local'], { session: false })
