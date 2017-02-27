const database = require('../database').state

module.exports = async (jwt) => {
    let passport
    try {
        passport = await database.models.Passport.findOne({ where: { jwt_token: jwt_auth_token } })
    } catch (error) {
        return new ApiError(error)
    }
    if (!passport) {
        return new ApiError(4004)
    }
}
