var moment = require('moment')

/**
 * [retrieveTransactions description]
 * @param  {[type]}  models  [description]
 * @param  {[type]}  plaid   [description]
 * @param  {[type]}  user_id [description]
 * @param  {[type]}  token   [description]
 * @return {Promise}         [description]
 */
var retrieveTransactions = async function(models, plaid, user_id, plaid_tokens) {
    return plaid_tokens.map(async function(token) {
        try {
            var plaidResponse = await plaid.getConnectUserAsync(token.access_token, {
                pending: true,
                gte: moment(token.last_transaction_pull).format("MM/DD/YY")
            })

            var transactions = await models.Transaction.upsertArray(
                await models.Transaction.fromPlaidArray(
                    plaidResponse.transactions,
                    user_id
                )
            )
        } catch(error) {
            console.error('Plaid Error pulling transactions and persisting to database: ', error, token)
        }

        token.update({ last_transaction_pull: moment().format() })

        return transactions
    })
}

module.exports = retrieveTransactions
