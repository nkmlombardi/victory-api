const passport = require('passport')
const strategy = require('passport-local').Strategy

passport.use(new strategy({ usernameField: 'email', passReqToCallback: true },
    async function(request, response, email, password, callback) {
        try {
            const user = await request.models.User.findOne({
                where: {
                    email: email
                }
            })
        } catch(error) {
            console.error('Database error retrieving User during local authentication: ', request, email, error)
            return callback(error)
        }

        // If no user was returned from query
        if (!user) {
            response.errorHandler(5004, request, response)
            return callback(null, false) }

        // Verify the password that was provided
        user.verifyPassword(password, function(error, isMatch) {

            // If error or password doesn't match
            if (error) { return callback(error) }
            if (!isMatch) { return console.log("username wrong") }

            // If password was correct
            request.strategy = 'local'
            return callback(null, user)
        })
    }
))

module.exports = passport.authenticate(['local'], { session: false })
