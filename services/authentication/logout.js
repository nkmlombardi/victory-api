const passport = require('passport')
const jwt = require('jsonwebtoken')
const moment = require('moment')

// TODO: I need to be a controller

module.exports = (request, response, next) => {
    // Save the JWT from the header
    const jwt_auth_token = request.headers.authorization.split(' ')[1]

    // Verify the JWT appears in auth, is a legitimate token, and hasn't been manipulated
    jwt.verify(jwt_auth_token, process.env.API_SECRET, async (error, decoded) => {
        if (request.client_ip_addr !== decoded.user_ip) return response.handlers.error(4006, request, response)
        token = await request.models.Passport.findOne({ where: { jwt_token: jwt_auth_token } })
        if (!token) return response.handlers.error(5002, request, response)
        if (token.deleted_at) return response.handlers.error(4005, request, response)

        // Set deleted_at to current time
        token.destroy()

        return response.json({
            message: "Successfully logged out.",
            token: token
        })
    })
}
