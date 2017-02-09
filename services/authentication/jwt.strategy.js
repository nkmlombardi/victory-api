const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const secret = require('.secret.key').secretKey
const errorLogger = require('./logger/file').errorlogger
const parameters = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    iss: 'api.onelink.com',
    sub: 'api_user',
    aud: 'noc.onelink.com'
}

passport.use(new JwtStrategy(parameters, function(payload, callback) {
    try {
        token = await request.models.Passport.findOne({ where: { jwt_token = response.token } })
    } catch (error) {
        errorLogger.log('error', '\n\t\tMessage: ', error)
    }


    User.findOne({id: payload.sub}, function(err, user) {
        if (err) {
            errorLogger.log('error', '\n\t\tMessage: ', error)
            return done(err, false)
        }
        if (user) {
            done(null, user)
        } else {
            done(null, false)
            // or you could create a new account
        }
    })
}))
