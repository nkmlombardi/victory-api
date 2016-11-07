module.exports = {
    // Resources
    user: require('./user'),
    account: require('./account'),
    transaction: require('./transaction'),
    category: require('./category'),
    scenario: require('./scenario'),
    budget: require('./budget'),

    // Services
    authentication: require('./authentication'),
    plaid: require('./plaid')
}
