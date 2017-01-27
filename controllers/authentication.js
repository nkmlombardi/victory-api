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
    postSelfPassport: async function(request, response, next) {
        if (!request.strategy) {
            console.error('API error, there was an an attempt to generate ' +
                'a passport authentication without a strategy')
            return response.json({
                status: request.status.error,
                data: {
                    message: 'API error, there was an an attempt to generate ' +
                        'a passport authentication without a strategy.'
                }
            })
        }

        try {
            var passport = await request.models.Passport.create({
                user_id: request.user.id,
                strategy: request.strategy
            })
        } catch(error) {
            console.error('Database error trying to generate a new Passport: ', error)
            return response.json({
                status: request.status.error,
                data: error
            })
        }

        response.json({
            status: request.status.success,
            data: {
                token: passport,
                user: request.user.publicAttributes()
            }
        })
    }
}
