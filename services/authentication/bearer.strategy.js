const passport = require('passport')
const Strategy = require('passport-http-bearer').Strategy

// FIX ERORR HANDLERS HERE

passport.use(new Strategy({ passReqToCallback: true },
    async (request, authToken, callback) => {
        let token
        let user
        try {
            token = await request.models.Passport.findOne({
                where: {
                    authToken
                }
            })
        } catch (error) {
            return response.handlers.error(5002, request, response)
        }

        if (!token) return callback(null, false)

        try {
            user = await request.models.User.scope('public').findOne({
                where: {
                    id: token.user_id
                }
            })
        } catch (error) {
            return response.handlers.error(5003, request, response)
        }

        if (!user) return callback(null, false)
        return callback(null, user, { scope: '*' })
    }
))

module.exports = passport.authenticate('bearer', { session: false })
