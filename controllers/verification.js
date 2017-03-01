const database = require('../database').state
const send_email = require('../services/email')
const passport_create = require('./passport').postPassport
const logger = require('../services/logger')
module.exports = {
    // Verify a user after they confirm their email address
    verify: async (jwt) => {
        let passport
        let user

        // Try to look up a user by their passport to see if they've registered
        try {
            passport = await database.models.Passport.findOne({ where: { jwt_token: jwt.query } })
            if (!passport) return new ApiError(error)
        } catch (error) {
            return new ApiError(error)
        }

        // If they have, look up the user in the database table and set user.verified to true
        try {
            user = await database.models.User.findOne({ where: { id: passport.user_id } })
            user.set('verified', 'true').save()
        } catch (error) {
            return new ApiError(error)
        }
        if (!passport) {
            return new ApiError(4004)
        }

        logger.console.log('info', '\n\tMessage: Successfully verified user.\n')
        logger.access.log('access', '\n\tMessage: Successfully verified user.\n')
        return "S u c c e s s f u l l y verified user."
    },

    // Allow a user to reset their password if they forget it via email
    recovery: async (email, ip) => {
        try {
            // See if a user with a particular email address exists
            user = await database.models.User.findOne({ where: { email } })

            // If they don't exist or are not verified, return an error
            if (!user) return new ApiError(4004)
            if (!user.verified) return new ApiError(6003)

            // Otherwise, send them a recovery email and create a passport for them.
            send_email.sender.sendRecovery(email)
            passport_create(user.id, ip)
            passport = await database.models.Passport.findOne({ where: { user_id: user.id } })
            if (!passport) {
                return new ApiError(error)
            }

        } catch (error) {
            return new ApiError(error)
        }
        logger.console.log('info', '\n\tMessage: Successfully sent recovery email.\n')
        logger.access.log('access', '\n\tMessage: Successfully sent recovery email.\n')
        return "S u c c e s s f u l l y sent recovery mail."
    },

    // Allow the user to choose a new password if they forget theirs
    resetPass: async (urlparse, password) => {
        try {
            if (!urlparse.query) return new ApiError('how did I get here')
            let jwt_token = urlparse.query.split('=?')[0]
            let passport = await database.models.Passport.findOne({ where: { jwt_token } })
            let user = await database.models.User.findOne({ where: { id: passport.user_id } })

            // Save the user's new password
            user.set('password', password).save()
        } catch (error) {
            return new ApiError(error)
        }
        logger.console.log('info', '\n\tMessage: Successfully changed password.\n')
        logger.access.log('access', '\n\tMessage: Successfully changed password.\n')
        return 'successfully changed p a s s'
    }
}
