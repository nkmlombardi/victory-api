const database = require('../database').state

module.exports = {
    verify: async (jwt) => {
        console.log(jwt)
        let passport
        let user
        try {
            passport = await database.models.Passport.findOne({ where: { jwt_token: jwt.query } })
            if (!passport) return new ApiError(error)
        } catch (error) {
            return new ApiError(error)
        }

        try {
            user = await database.models.User.findOne({ where: { id: passport.user_id } })
            user.set('verified', 'true').save()
        } catch (error) {
            return new ApiError(error)
        }
        if (!passport) {
            return new ApiError(4004)
        }
        console.log('Successfully v e r i f i e d')

        return "S u c c e s s f u l l y verified user."
    }
}
