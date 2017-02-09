const jwt = require('jsonwebtoken')
const secret = require('../services/authentication/.secret.key').secretKey

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

        if (!request.strategy) return response.handlers.error(2000, request, response)

        request.token = jwt.sign({
            iss: 'api.onelink.com',
            sub: 'api_user',
            aud: 'noc.onelink.com',
            user_id: request.user.id
        }, secret , {
            expiresIn: 300 // 5 minutes
        })

        try {
            passport = await request.models.Passport.create({
                user_id: request.user.id,
                strategy: request.strategy,
                jwt_token: request.token
            })
        } catch (error) {
            console.log('passport error', error)
            return response.handlers.error(2001, request, response)
        }



        return response.json({
            data: {
                token: passport,
                user: request.user.publicAttributes()
            }
        })
    }
}
