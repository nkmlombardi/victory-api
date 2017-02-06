const passport = require('passport')
const Strategy = require('passport-http-bearer').Strategy
const moment = require('moment')
const consoleLogger = require('../logger/console.logger')
const accessLogger = require('../logger/file.logger').accessLogger

// TODO: FIX ERORR HANDLERS HERE
passport.use(new Strategy({ passReqToCallback: true },
    async (request, auth_token, callback) => {
        let token
        let user
        let cutOff
        let tokenUpdate


        try {
            token = await request.models.Passport.findOne({ where: { auth_token } })
        } catch (error) {
            return response.handlers.error(5002, request, response)
        }

        if (!token) {
            return callback(null, false)
        }

        cutOff = moment().subtract(15, 'seconds').format()
        tokenUpdate = moment(token.updated_at).format()
        expired = !moment(tokenUpdate).isAfter(cutOff)

        // check if the token is still valid
        if (expired) {
            // if the token is expired
            // log them out, take them to login screen to log back in and
            // generate new token
            console.log('auth_token expired.\n',
                'last updated:      ', tokenUpdate,
                '\n expiration cutoff: ', cutOff)
            accessLogger.log('User authentication token has expired.')
            consoleLogger.log('User authentication token has expired.')
            return callback(null, false)

        }


        try {
            user = await request.models.User.scope('public').findOne({ where: { id: token.user_id } })
        } catch (error) {
            // return response.handlers.error(5003, request, response)
        }

        if (!user) return callback(null, false)
        return callback(null, user, { scope: '*' })
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('bearer', function (error, user, info) {
        // will generate a 500 error
        if (error) return response.handlers.error(error, request, response)

        // Generate a JSON response reflecting authentication status
        // TODO: Create no user && password found.
        if (expired) return response.handlers.error(4005, request, response)

        if (!user) return response.handlers.error(4004, request, response)

        return next()
    })(request, response, next)
}
