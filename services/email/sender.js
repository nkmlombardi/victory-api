const nodemailer = require('nodemailer')
const handlers = require('../handlers')
const logger = require('../logger')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.API_EMAIL, // Your email id
        pass: process.env.API_EMAIL_PASS // Your password
    }
})

module.exports = {
    sendVerification: async (email, jwt) => {
        let mailOptions = {
            from: process.env.API_EMAIL, // sender address
            to: email, // list of receivers
            subject: 'OneLink API registration', // Subject line
            text: 'Thank you for registering with the OneLink API.  Please click this link to complete your registration: http://localhost:3000/v1/verification?query=' + passport.jwt_token + '\n Send any bug reports to onelinkapitest@gmail.com. '
        }

        let sendMail = await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return new ApiError(error)
            } else {
                logger.console.log('info', '\n\tMessage: ', info.response, '\n')
                logger.access.log('access', '\n\tMessage: ', info.response, '\n')
                return "registration email s e n t"
            }
        })
    },

    sendRecovery: async (email) => {
        let mailOptions = {
            from: process.env.API_EMAIL, // sender address
            to: email, // list of receivers
            subject: 'OneLink API password recovery', // Subject line
            text: 'If you have forgotten your email, please follow these steps.\n  If you were not expecting to receive this email, someone may be trying to gain access to your account.  Please click this link to reset your password: http://localhost:3000/v1/resetPassword?query=' + passport.jwt_token + '\n Send any bug reports to onelinkapitest@gmail.com.'
        }

        let recovery = await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return new ApiError(error)
            } else {
                    logger.console.log('info', '\n\tMessage: ', info.response, '\n')
                    logger.access.log('access', '\n\tMessage: ', info.response, '\n')
                return "recover email s e n t"
            }
        })
    }
}
