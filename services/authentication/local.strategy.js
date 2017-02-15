const passport = require('passport')
const Strategy = require('passport-local').Strategy


passport.use(new Strategy({ usernameField: 'email', passReqToCallback: true },
    async (request, email, password, callback) => {
        console.time('local strat')
        let user

        try {
            user = await request.models.User.findOne({ where: { email } })
        } catch (error) {
            return callback(error)
        }


        // If no user was returned from query
        if (!user) {
            // response.errorHandler(5004, request, response)
            return callback(null, false)
        }
        user.client_IP = request.ip
        // Verify the password that was provided
        user.verifyPassword(password, (error, isMatch) => {
            // If error or password doesn't match
            if (error) return callback(error)
            if (!isMatch) return callback(error)

            request.strategy = 'local'
            request.user = user

            return callback(null, user)
        })
        console.timeEnd('local strat')
    }
))

module.exports = function (request, response, next) {
    console.time('local export')
    passport.authenticate('local', function (error, user, info) {
        // will generate a 500 error
        if (error) return response.handlers.error(error, request, response)

        // Generate a JSON response reflecting authentication status
        // TODO: Create no user && password found.
        if (!user) return response.handlers.error(4004, request, response)

        return next()
    })(request, response, next)
    console.timeEnd('local export')
}
