const passport = require('passport')
const Strategy = require('passport-local').Strategy

passport.use(new Strategy({ usernameField: 'email', passReqToCallback: true },
    async (request, response, email, password, callback) => {
        let user
        try {
            user = await request.models.User.findOne({
                where: {
                    email
                }
            })
        } catch (error) {
            console.error('Database error retrieving User during local authentication: ', request, email, error)
            return callback(error)
        }

        // If no user was returned from query
        if (!user) {
            response.errorHandler(5004, request, response)
            return callback(null, false)
        }

        // Verify the password that was provided
        user.verifyPassword(password, (error, isMatch) => {
            // If error or password doesn't match
            if (error) return callback(error)
            if (!isMatch) return console.log('username wrong')
            request.strategy = 'local'
            return request.strategy
        })
        // If password was correct
        return callback(null, user)
    }
))

module.exports = passport.authenticate(['local'], { session: false })
