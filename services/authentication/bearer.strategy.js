var passport = require('passport')
var strategy = require('passport-http-bearer').Strategy

passport.use(new strategy({ passReqToCallback: true },
    async function(req, auth_token, callback) {
        try {
            var token = await req.models.Passport.findOne({
                where: {
                    auth_token: auth_token
                }
            })
        } catch(error) {
            console.error('Database error retrieving Passport associated with auth_token: ', error)
            return callback(error)
        }

        if (!token) { return callback(null, false); }

        try {
            var user = await req.models.User.scope('public').findOne({
                where: {
                    id: token.user_id
                }
            })
        } catch(error) {
            console.error('Database error retrieving User associated with bearer token: ', req, error)
            return callback(error)
        }

        if (!user) { return callback(null, false) }
        return callback(null, user, { scope: '*' })
    }
))

module.exports = passport.authenticate('bearer', { session: false })
