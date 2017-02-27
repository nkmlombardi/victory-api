const database = require('../database').state
const send_email = require('../services/email')
const passport_create = require('./passport').postPassport
module.exports = {
    verify: async (jwt) => {
        let passport
        let user
        try {
            passport = await database.models.Passport.findOne({ where: { jwt_token: jwt.query } })
            if (!passport) return new ApiError(error)
        } catch (error) {
            return new ApiError(error)
        }

        try {
            user = await database.models.User.findOne({ where: { id: passport.user_id } })
            user.set('verified', 'true').save()
        } catch (error) {
            return new ApiError(error)
        }
        if (!passport) {
            return new ApiError(4004)
        }
        console.log('Successfully v e r i f i e d')

        return "S u c c e s s f u l l y verified user."
    },

    recovery: async (email, ip) => {
        try {
            user = await database.models.User.findOne({ where: { email } })
            if (!user) return new ApiError(4004)

            send_email.sender.sendRecovery(email)
            passport_create(user.id, ip)
            passport = await database.models.Passport.findOne({ where: { user_id: user.id } })
            if (!passport) {
                console.log(error)
                return new ApiError(error)
            }

        } catch (error) {
            return new ApiError(error)
        }
        return "S u c c e s s f u l l y sent recovery mail."
    },

    resetPass: async (urlparse) => {
        console.log(urlparse)
        try {
            if (!urlparse.query) return new ApiError('how did I get here')
            let jwt_token = urlparse.query.split('=?')[0]
            let passport = await database.models.Passport.findOne({ where: { jwt_token } })
            let user = await database.models.User.findOne({ where: { id: passport.user_id } })
            user.set('password', 'test').save()
        } catch (error) {
            console.log(error)
            return new ApiError(error)
        }
    }
}
