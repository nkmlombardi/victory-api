var passport = require('passport')
var strategy = require('passport-local').Strategy

passport.use(new strategy({ usernameField: 'email', passReqToCallback: true },
    async function(request, email, password, callback) {
        try {
            var user = await request.models.User.findOne({ where: { email: email } })
        } catch(error) {
            console.error('Database error retrieving User during local authentication: ', request, email, error)
            return callback(error)
        }

        // If no user was returned from query
        if (!user) return callback(null, false)

        // Verify the password that was provided
        user.verifyPassword(password, function(error, isMatch) {
            // If error or password doesn't match
            if (error) { return callback(error) }
            if (!isMatch) { return console.log("username wrong") }

            // If password was correct
            request.strategy = 'local'
            request.user = user

            return callback(null, user)
        })
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('local', function (error, user, info) {
        // will generate a 500 error
        if (error) return response.handlers.error(error, request, response)

        // Generate a JSON response reflecting authentication status
        // TODO: Create no user && password found.
        if (!user) return response.handlers.error(4004, request, response)

        return next()
    })(request, response, next)
}
