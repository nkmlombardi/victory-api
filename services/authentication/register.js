const validEmail = require('../utilities').isValidEmail
const handlers = require('../handlers')
const bcrypt = require('bcryptjs')



/*
    This should be part of the deletePassport controller.
 */
module.exports = async (request, response) => {
    let email = request.body.email

    if (!validEmail(email)) {
        return new ApiError(6000)
    }

    try {
        let user = await request.models.User.findOne({
            where: { email }
        })
        return user
    } catch (error) {
        return new ApiError(error)
    }

    if (user) {
        return new ApiError(6001)
    }

    return response.json({
        data: {
            status: "s u c c e s s"
        }
    })
}
