const plaid = require('plaid')
bluebird.promisifyAll(plaid)

module.exports = {
    state: new plaid.Client(
        process.env.PLAID_CLIENT_ID,
        process.env.PLAID_SECRET_KEY,
        process.env.PLAID_ENV
    ),
    connect: require('./connect'),
    exchange: require('./exchange'),
    webhook: require('./webhook'),
    transactions: require('./transactions'),
    accounts: require('./accounts')
}
