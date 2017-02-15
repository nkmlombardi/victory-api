


const bcrypt = require('bcryptjs')
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const expressJwt = require('express-jwt')
const authJwt = expressJwt({ secret: process.env.API_SECRET })
const errorLogger = require('../logger/file.logger').errorLogger
const passport = require('passport')
const jwt = require('jsonwebtoken')
const moment = require('moment')

passport.use(new Strategy({
    secretOrKey: process.env.API_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    iss: 'api.onelink.com',
    sub: 'api_user',
    aud: 'noc.onelink.com',
    passReqToCallback: true
},
    async (request, payload, callback) => {
        console.log('testing')
        let hashed_ip
        // Check if auth header undefined

        // Check if JWT is verified
        let verified = await jwt.verify(request.headers.authorization.split(' ')[1], process.env.API_SECRET, (err, decoded) => {
            if (decoded) {
                console.log('decoded: ', decoded)
                hashed_ip = decoded.user_ip
            }
            // check if a passport exists with a matching jwt
            // token = await request.models.Passport.findOne({
            //     where: {
            //         jwt_token: request.headers.authorization.split(' ')[1]
            //     }
            // })
        })
        if (!bcrypt.compareSync("10.10.10.10", hashed_ip)) {
            return callback(null, Error('IP is unverified'))
        }

        //  return callback('\nno auth header found', 'user', 4008)
        // If all is well, return no error and just user_id
         return callback('success', 'token.user_id', 'no error')
    }
))

module.exports = function (request, response, next) {
    passport.authenticate('jwt', (user, error) => {
        let cutOff
        let tokenUpdate
        let expired
        console.log('\n user: ', user, '\n error: ', error)
        if (error) {
            console.log('\n user: ', user, '\n error: ', error, '\n errorToSTring: ', error.toString().split('\n')[0])
            let error_string = error.toString().split('\n')[0]

            switch (error_string) {
                case 'Error: No auth token':
                    console.log('caught no auth error')
                    return response.handlers.error(4008, request, response)

                case 'JsonWebTokenError: invalid token':
                    console.log('caught invalid token')
                    return response.handlers.error(4007, request, response)

                case 'Error: IP is unverified':
                    console.log('caught unverified ip')
                    return response.handlers.error(4006, request, response)

                default:
                    console.log('default error')
                    return response.handlers.error(4009, request, response)
            }
        }


        // if (typeof token === 'undefined') return response.handlers.error(4008, request, response)
        // if (token) {
        //     cutOff = moment().subtract(30, 'seconds').format()
        //     tokenUpdate = moment(token.updated_at).format()
        //     expired = !moment(tokenUpdate).isAfter(cutOff)
        // }


        // // No auth header
        // return response.handlers.error(4008, request, response)
        //
        // // No JWT in auth header
        // return response.handlers.error(4008, request, response)
        //
        // // JWT Verify failed
        // return response.handlers.error(4007, request, response)
        //
        // // Client has incorrect IP address
        // return response.handlers.error(4006, request, response)
        //
        // // No user found
        // return response.handlers.error(4004, request, response)
        //
        // // JWT is expired
        // return response.handlers.error(4005, request, response)
        //
        // // Touch token to update
        // token.changed('updated_at', true).save()
        return next()
    })(request, response, next)
}
