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
            html: '<div><div style="margin: 0 auto; width: 40%; background: white; color: black; font-family:Arial,Helvetica,sans-serif;color:#666666;font-size:14px;line-height:20px;margin-top:20px"><p style="text-align: center; color: black;font-size:22px">Thank you for registering with <span style="color: navy;font-weight: bold;">Onelink</span><span style="color: #8080FF; font-weight: bold;">NOC</span></p><p class="lead" style="color: black;text-align: center;">Send any bug reports to <a href="mailto:onelinkapitest@gmail.com">onelinkapitest@gmail.com</a>, or submit an issue at  <a href="https://github.com/onelink-translations/onelink-api/issues">our github</a>.<p class="lead" style="color: black;text-align: center;">Please click the button to complete your registration.</p><div style="text-align: center;padding: 10px;margin:10px;"><a href="http://localhost:3000/v1/verification?query=' + passport.jwt_token + '" style=" background: #7fbdff; background-image: -webkit-linear-gradient(top, #7fbdff, #366ee0); background-image: -moz-linear-gradient(top, #7fbdff, #366ee0); background-image: -ms-linear-gradient(top, #7fbdff, #366ee0); background-image: -o-linear-gradient(top, #7fbdff, #366ee0); background-image: linear-gradient(to bottom, #7fbdff, #366ee0); -webkit-border-radius: 6; -moz-border-radius: 6; border-radius: 6px; text-shadow: 3px 1px 3px #8080ff; font-family: Arial; color: #ffffff; font-size: 20px; padding: 10px 20px 10px 20px; border: solid #85b8d6 1px; text-decoration: none;">Complete Registration</a></div></div>'
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
            html: '<div><div style="margin: 0 auto; width: 40%; background: white; color: black; font-family:Arial,Helvetica,sans-serif;color:#666666;font-size:14px;line-height:20px;margin-top:20px"><p style="text-align: center; color: black;font-size:22px">If you have forgotten your password, please follow these steps.</p><p class="lead" style="color: black;text-align: center;">Click the button at the bottom of this email to reach the password recovery page for the <span style="color: navy;font-weight: bold;">Onelink</span><span style="color: #8080FF; font-weight: bold;">NOC</span>. Enter your new password to secure your account. Send any bug reports to <a href="mailto:onelinkapitest@gmail.com">onelinkapitest@gmail.com</a>, or submit an issue at  <a href="https://github.com/onelink-translations/onelink-api/issues">our github</a>.<p class="lead" style="color: black;text-align: center;">Please click the button to change your password.</p><div style="text-align: center;padding: 10px;margin:10px;"><a href="http://localhost:3000/v1/resetPassword?query=' + passport.jwt_token + '" style=" background: #7fbdff; background-image: -webkit-linear-gradient(top, #7fbdff, #366ee0); background-image: -moz-linear-gradient(top, #7fbdff, #366ee0); background-image: -ms-linear-gradient(top, #7fbdff, #366ee0); background-image: -o-linear-gradient(top, #7fbdff, #366ee0); background-image: linear-gradient(to bottom, #7fbdff, #366ee0); -webkit-border-radius: 6; -moz-border-radius: 6; border-radius: 6px; text-shadow: 3px 1px 3px #8080ff; font-family: Arial; color: #ffffff; font-size: 20px; padding: 10px 20px 10px 20px; border: solid #85b8d6 1px; text-decoration: none;">Change Your Password</a></div></div>'




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
