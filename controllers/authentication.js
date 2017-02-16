const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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
    console.time('Authentication.js')
        let passport

        try {
            passport = await request.models.Passport.create({
                user_id: request.user.id,
                strategy: request.strategy,
                jwt_token: request.token = jwt.sign({
                    iss: 'api.onelink.com',
                    sub: 'api_user',
                    aud: 'noc.onelink.com',
                    user_ip: request.client_ip_addr,
                    user_id: request.user.id,
                    strategy: 'Jwt'
                }, process.env.API_SECRET, { expiresIn: 30 })
            })
        } catch (error) {
            console.log('passport error', error)
            return response.handlers.error(2001, request, response)
        }

        if (!request.strategy) return response.handlers.error(2000, request, response)



        console.timeEnd('Authentication.js')
        return response.json({
            data: {
                token: passport
            }
        })

    }

}
