const validEmail = require('../services/utilities').isValidEmail
const validPassword = require('../services/utilities').isValidPassword
const handlers = require('../services/handlers')
const database = require('../database').state

module.exports = {
    postUser: async (email, password) => {
        try {
            // Check if the email is valid
            if (!validEmail(email)) {
                return new ApiError(6000)
            }
            console.log('test')
            // Check if password is valid
            // 8 char minimum, alphanumberic upper lower + symbols
            if (!validPassword(password)) {
                return new ApiError(6002)
            }
            console.log('test')

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

            return {
                message: 'User c r e a t e d'
            }
        } catch (error) {
            return new ApiError(error)
        }
    }
}
