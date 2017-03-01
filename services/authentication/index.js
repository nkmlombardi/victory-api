module.exports = {
    isLocal: require('./local.strategy'),
    isBearer: require('./bearer.strategy'),
    isJwt: require('./jwt.strategy')
}
