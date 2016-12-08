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
    postSelfPassport: async function(req, res, next) {
        if (!req.strategy) {
            console.error('API error, there was an an attempt to generate ' +
                'a passport authentication without a strategy')
            return res.json({
                status: req.status.error,
                data: {
                    message: 'API error, there was an an attempt to generate ' +
                        'a passport authentication without a strategy.'
                }
            })
        }

        try {
            var passport = await req.models.Passport.create({
                user_id: req.user.id,
                strategy: req.strategy
            })
        } catch(error) {
            console.error('Database error trying to generate a new Passport: ', error)
            return res.json({
                status: req.status.error,
                data: error
            })
        }

        res.json({
            status: req.status.success,
            data: {
                token: passport,
                user: req.user.publicAttributes()
            }
        })
    }
}
