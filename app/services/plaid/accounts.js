/**
 * [retrieveTransactions description]
 * @param  {[type]}  models  [description]
 * @param  {[type]}  plaid   [description]
 * @param  {[type]}  user_id [description]
 * @param  {[type]}  token   [description]
 * @return {Promise}         [description]
 */
var retrieveAccounts = async function(models, plaid, user_id, access_token) {
    var accountsResponse = await plaid.getBalanceAsync(access_token)

    if (accountsResponse.accounts.length === 0) {
        return {
            status: 'error',
            message: 'No accounts were returned by the request.',
            accounts: []
        }
    }

    var accounts = await models.Account.upsertArray(
        await models.Transaction.fromPlaidArray(
            transactionsResponse.transactions,
            user_id
        )
    )

    return {
        status: 'success',
        message: 'Accounts have been retrieved and updated.',
        payload: accountsResponse.accounts
    }
}

module.exports = retrieveAccounts
