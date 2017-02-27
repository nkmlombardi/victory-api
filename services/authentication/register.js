const validEmail = require('../utilities').isValidEmail
const handlers = require('../handlers')
const bcrypt = require('bcryptjs')



/*
    This should be part of the deletePassport controller.
 */
module.exports = async (request, response) => {
    let email = request.body.email
    let password = request.body.password

    if (!validEmail(email)) {
        return handlers.error(6000, (status, payload) => response.status(status).json(payload))
    }

    try {
        let user = await request.models.User.findOne({ where: { email } })
        return user
    } catch (error) {
        return handlers.error(error, (status, payload) => response.status(status).json(payload))
    }

    if (user) {
        return handlers.error(6001, (status, payload) => response.status(status).json(payload))
    }

    return response.json({
        data: {
            status: "s u c c e s s"
        }
    })
}
