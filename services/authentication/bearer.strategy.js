const passport = require('passport')
const Strategy = require('passport-http-bearer').Strategy
const moment = require('moment')
const consoleLogger = require('../logger/console.logger')
const accessLogger = require('../logger/file.logger').accessLogger
let expired = true

// TODO: FIX ERORR HANDLERS HERE
passport.use(new Strategy({ passReqToCallback: true },
    async (request, auth_token, callback) => {
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

        cutOff = moment().subtract(30, 'minutes').format()
        tokenUpdate = moment(token.updated_at).format()
        expired = !moment(tokenUpdate).isAfter(cutOff)

        try {
            user = await request.models.User.scope('public').findOne({ where: { id: token.user_id } })
        } catch (error) {
            return response.handlers.error(5003, request, response)
        }

        return callback(null, user, { scope: '*' })
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('bearer', function (error, user, info) {
        // will generate a 500 error
        if (error) return response.handlers.error(error, request, response)

        // if token is expired
        if (expired) return response.handlers.error(4005, request, response)

        // wrong user/pass combo
        if (!user) return response.handlers.error(4004, request, response)

        return next()
    })(request, response, next)
}
