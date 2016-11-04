module.exports = {
    // Resources
    user: require('./user'),
    account: require('./account'),
    transaction: require('./transaction'),
    category: require('./category'),
    scenario: require('./scenario'),
    budget: require('./budget'),

    // Services
    plaid: require('./plaid'),

    // Authentication
    auth: require('./authentication'),
    token: require('./token')
};
