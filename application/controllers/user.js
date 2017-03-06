const validEmail = require('../services/utilities').isValidEmail
const validPassword = require('../services/utilities').isValidPassword
const handlers = require('../services/handlers')
const database = require('../database').state
const nodemailer = require('nodemailer')
const passport_create = require('./passport').postPassport
const send_email = require('../services/email')


module.exports = {
    postUser: async (email, password, ip) => {
        try {
            // Check if the email is valid
            if (!validEmail(email)) {
                return new ApiError(6000)
            }

            // Check if password is valid
            // 8 char minimum, alphanumberic upper lower + symbols
            if (!validPassword(password)) {
                return new ApiError(6002)
            }

            // If so, check if it's already registered
            let user = await database.models.User.findOne({
                where: { email: email }
            })

            // If so, return error
            if (user) return new ApiError(6001)


            // Otherwise, create the new user
            user = await database.models.User.create({
                email: email,
                password: password
            })

            // Create a passport for new user
            passport_create(user.id, ip)

            // Get the user's email and jwt
            user = await database.models.User.findOne({ where: { email } })
            passport = await database.models.Passport.findOne( { where: { user_id: user.id } } )
            let registration_jwt = passport.jwt_token

            // Send them a verification email
            send_email.sender.sendVerification(email, registration_jwt)

        } catch (error) {
            return new ApiError(error)
        }
        return "email verification l a u n c h e d "
    }
}
