const jwt = require('jsonwebtoken')
const device = require('device')
const database = require('../database').state

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
    postPassport: async (user_id, user_ip) => {
        let passport
        console.log(user_ip)
        try {
            passport = await database.models.Passport.create({
                user_id: user_id,
                device_type: device().type,
                jwt_token: jwt.sign({
                    iss: 'api.onelink.com',
                    sub: 'api_user',
                    aud: 'noc.onelink.com',
                    user_id: user_id,
                    user_ip: user_ip
                }, process.env.API_SECRET, { expiresIn: 60 * 60 * 24 })
                // expiration is 1 day (60s * 60 = 1hr, 1hr * 24 = 1d)
            })
        } catch (error) {
            return new ApiError(2001)
        }

        return passport
    },

    /**
     * Soft deletes a passport, requiring the user to authenticate again
     * @param  {[type]}  jwt_auth_token [description]
     * @return {Promise}                [description]
     */
    deletePassport: async (jwt_auth_token) => {
        let passport

        try {
            passport = await database.models.Passport.findOne({ where: { jwt_token: jwt_auth_token } })
        } catch (error) {
            return new ApiError(error)
        }
        if (!passport) {
            return new ApiError(4004)
        }

        passport.destroy()

        return {
            message: "s u c c e s s f u l l y logged o u  t"
        }
    }
}
