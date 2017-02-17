module.exports = {
    isLocal: require('./local.strategy'),
    isBearer: require('./bearer.strategy')
}
