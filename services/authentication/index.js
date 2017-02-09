module.exports = {
    isLocal: require('./local.strategy'),
    isJwt: require('./jwt.strategy')
}
