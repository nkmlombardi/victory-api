const nodemailer = require('nodemailer')
const handlers = require('../handlers')
const logger = require('../logger')
const nunjucks = require('nunjucks')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.API_EMAIL, // Your email id
        pass: process.env.API_EMAIL_PASS // Your password
    }
})

let EmailTemplate = require('email-templates').EmailTemplate

module.exports = {
    sendVerification: async (email, jwt) => {
        let verificationEmail = new EmailTemplate('./services/email/templates/verification')
        let info = {
            token: passport.jwt_token,
            url: 'http://localhost:3000/v1/verification?query='
        }

        verificationEmail.render(info, (error, result) => {
            if (error) {
                console.log("template dir", templateDir)
                console.log('error', error)
                return new ApiError(error)
            }
            let mailOptions = {
                from: process.env.API_EMAIL, // sender address
                to: email, // list of receivers
                subject: 'OneLink API registration', // Subject line
                html: result.html
            }
            let sendMail = transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return new ApiError(error)
                } else {
                    logger.console.log('info', '\n\tMessage: ', info.response, '\n')
                    logger.access.log('access', '\n\tMessage: ', info.response, '\n')
                    return "registration email s e n t"
                }
            })
        })
    },

    sendRecovery: async (email) => {
        let recoveryEmail = new EmailTemplate('./services/email/templates/recovery')
        let info = {
            token: passport.jwt_token,
            url: 'http://localhost:3000/v1/resetPassword?query='
        }

        recoveryEmail.render(info, (error, result) => {
            if (error) {
                return new ApiError(error)
            }
            let mailOptions = {
                from: process.env.API_EMAIL, // sender address
                to: email, // list of receivers
                subject: 'OneLink API password recovery', // Subject line
                html: result.html
            }
            let recovery = transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return new ApiError(error)
                } else {
                        logger.console.log('info', '\n\tMessage: ', info.response, '\n')
                        logger.access.log('access', '\n\tMessage: ', info.response, '\n')
                    return "recover email s e n t"
                }
            })
        })
    }
}
