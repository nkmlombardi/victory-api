const jwt = require('jsonwebtoken')
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
    postSelfPassport: async (request, response) => {
        let passport

        try {
            passport = await request.models.Passport.create({
                user_id: request.user.id,
                jwt_token: request.token = jwt.sign({
                    iss: 'api.onelink.com',
                    sub: 'api_user',
                    aud: 'noc.onelink.com',
                    user_ip: request.client_ip_addr,
                    user_id: request.user.id,
                    strategy: request.strategy
                }, process.env.API_SECRET, { expiresIn: 60 * 60 * 24 })
                // expiration is 1 day (60s * 60 = 1hr, 1hr * 24 = 1d)
            })
        } catch (error) {
            return response.handlers.error(2001, request, response)
        }

        if (!request.strategy) return response.handlers.error(2000, request, response)

        return response.json({
            data: {
                token: passport
            }
        })

    }

}
