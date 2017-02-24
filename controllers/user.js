const validEmail = require('../services/utilities').isValidEmail
const handlers = require('../services/handlers')
const database = require('../database').state

module.exports = {
    postUser: async (email, password) => {
        try {
            if (!validEmail(email)) {
                return new ApiError(6000)
            }

            let user = await database.models.User.findOne({
                where: { email: email }
            })

            if (user) return new ApiError(6001)


            // Create the new user
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
