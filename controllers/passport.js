const jwt = require('jsonwebtoken')
const device = require('device')

module.exports = {
    /**
     * Create new Passport login via a local authentication strategy. This
     * endpoint verifies the credentials provided against an existing user in
     * the database. If the credentials are invalid, an error is returned and
     * a Passport authentication is not created.
     *
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    postPassport: async (request, response) => {
        let passport
        let user_device = device()

        try {
            passport = await request.models.Passport.create({
                user_id: request.user.id,
                device_type: user_device.type,
                jwt_token: request.token = jwt.sign({
                    iss: 'api.onelink.com',
                    sub: 'api_user',
                    aud: 'noc.onelink.com',
                    user_ip: request.client_ip_addr,
                    user_id: request.user.id
                }, process.env.API_SECRET, { expiresIn: 60 * 60 * 24 })
                // expiration is 1 day (60s * 60 = 1hr, 1hr * 24 = 1d)
            })
        } catch (error) {
            return handlers.error(2001, (status, payload) => response.status(status).json(payload))
        }

        if (!request.strategy) return handlers.error(2000, (status, payload) => response.status(status).json(payload))

        return response.json({
            data: {
                token: passport
            }
        })
    },


    deletePassport: async () => {
        let passport

        passport = await request.models.Passport.findOne({ where: { jwt_token: jwt_auth_token } })

        passport.destroy()

        return true
    }
}
