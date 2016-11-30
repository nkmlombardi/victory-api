var moment = require('moment')
var Promise = require('bluebird')

/**
 * Retrieve transasctions from the Plaid API
 *
 * @param  {[type]}  models  [description]
 * @param  {[type]}  plaid   [description]
 * @param  {[type]}  user_id [description]
 * @param  {[type]}  token   [description]
 * @return {Promise}         [description]
 */
var retrieveTransactions = async function(models, plaid, user_id, plaid_tokens) {
    return Promise.all(plaid_tokens.map(async function(token) {
        try {
            // Default request object to be sent to the Plaid API
            var requestObject = {
                pending: true
            }

            // Only set a greater than property if we've ever pulled before. This
            // property filters the returned transactions to ones that occured after
            // the specified date
            if (token.last_transaction_pull) {
                requestObject.gte = moment(token.last_transaction_pull).format('MM/DD/YY')
            }

            var plaidResponse = await plaid.getConnectUserAsync(token.access_token, requestObject)

            console.log('Plaid Transaction Response: ', plaidResponse)

            var transactions = []

            // Only bother running the inject method if we actually have transactions
            if (plaidResponse.transactions.length > 0) {
                try {
                    transactions = await Promise.all(
                        models.Transaction.upsertArray(

                            // Generate injectable object from Plaid data
                            await models.Transaction.fromPlaidArray(

                                // The actual Plaid Transaction data
                                plaidResponse.transactions,

                                // User ID to be attached to Transactions
                                user_id,

                                // Accounts to be referenced by the Transactions
                                models.Account.createPlaidMap(
                                    await models.Account.findAll({
                                        where: { user_id: user_id },
                                        attributes: ['id', 'plaid_id']
                                    })
                                ),

                                // Categories to be referenced by the Transactions
                                await models.Category.createPlaidMap(
                                    await models.Category.findAll({
                                        attributes: ['id', 'plaid_id']
                                    })
                                )
                            ), {
                                // Clause that states which properties are to be
                                // used when determining if a Transaction should
                                // be overwritten or if a new Transaction should
                                // be created
                                where: {
                                    plaid_id: this._id
                                }
                            }
                        )
                    )
                } catch(error) {
                    console.error('Database Error injecting Transactions: ', error)

                    return {
                        status: 'error',
                        data: error
                    }
                }
            }
        } catch(error) {
            console.error('Plaid Error pulling transactions and persisting to database: ', error, token)

            return {
                status: 'error',
                data: error
            }
        }

        console.log('upsertArray Response: ', transactions)

        token.update({ last_transaction_pull: moment().format() })

        return {
            status: 'success',
            data: transactions
        }
    }))
}

module.exports = retrieveTransactions
