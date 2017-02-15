const passport = require('passport')
const Strategy = require('passport-http-bearer').Strategy
const moment = require('moment')
let expired = true

// TODO: FIX ERORR HANDLERS HERE
passport.use(new Strategy({ passReqToCallback: true },
    async (request, auth_token, callback) => {
        let user
        let cutOff
        let tokenUpdate

        try {
            token = await request.models.Passport.findOne({ where: { auth_token } })
            console.log(token)
            console.log('got token')
        } catch (error) {
            console.log('error on getting token: ', error)
            return response.handlers.error(5002, request, response)
        }

        if (!token) {
            console.log(' !token ')
            return callback(null, 4006, 4006)
        }
        console.log('after !token')



        cutOff = moment().subtract(30, 'minutes').format()
        tokenUpdate = moment(token.updated_at).format()
        expired = !moment(tokenUpdate).isAfter(cutOff)
        console.log('expired: ', expired)

        try {
            user = await request.models.User.scope('public').findOne({ where: { id: token.user_id } })
            console.log('in user test block', user)
        } catch (error) {
            console.log('error in user test block', error)
            return response.handlers.error(5003, request, response)
        }

        return callback(null, user, { scope: '*' })
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('bearer', function (error, user, info) {
        console.log('in module.exports')
        // will generate a 500 error

        console.log('error: \n', error)
        console.log('user: \n', user)
        console.log('info: \n', info)
        if (error) return response.handlers.error(error, request, response)

        // if token is expired
        if (expired) return response.handlers.error(4005, request, response)

        // wrong user/pass combo
        if (!user) return response.handlers.error(4004, request, response)

        token.changed('updated_at', true).save()
        return next()
    })(request, response, next)
}
