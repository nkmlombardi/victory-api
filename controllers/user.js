const validEmail = require('../services/utilities').isValidEmail
const validPassword = require('../services/utilities').isValidPassword
const handlers = require('../services/handlers')
const database = require('../database').state
const nodemailer = require('nodemailer')
const passport_create = require('./passport').postPassport


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


            passport_create(user.id, ip)


        // After user is created, send an email to the address
        //
        // link in the email to activate account and let it log in?
        //

            user = await database.models.User.findOne({ where: { email } })
            passport = await database.models.Passport.findOne( { where: { user_id: user.id } } )

            console.log('user.ikd:', user.id)
            console.log('passport:', passport)

            let registration_jwt = passport.jwt_token

            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.API_EMAIL, // Your email id
                    pass: process.env.API_EMAIL_PASS // Your password
                }
            })

            var mailOptions = {
                from: process.env.API_EMAIL, // sender address
                to: email, // list of receivers
                subject: 'OneLink API registration', // Subject line
                text: 'Thank you for registering with the OneLink API.  Please click this link to complete your registration: http://localhost:3000/v1/verification?query=' + passport.jwt_token + '\n Send any bug reports to onelinkapitest@gmail.com. '
            }

            sendMail = await transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    return new ApiError(error)
                } else {
                    console.log('Message sent: ' + info.response);
                    return "s u c c e s s f u l l y sent email"
                }
            })
        } catch (error) {
            return new ApiError(error)
        }
    }
}
