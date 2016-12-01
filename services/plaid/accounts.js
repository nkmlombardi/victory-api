var moment = require('moment')
var Promise = require('bluebird')

/**
 * Retrieve accounts and their balances from the Plaid API
 *
 * @param  {[type]}  models  [description]
 * @param  {[type]}  plaid   [description]
 * @param  {[type]}  user_id [description]
 * @param  {[type]}  token   [description]
 * @return {Promise}         [description]
 */
var retrieveAccounts = async function(models, plaid, user_id, plaid_tokens) {
    return Promise.all(plaid_tokens.map(async function(token) {
        try {
            var accountsResponse = await plaid.getBalanceAsync(token.access_token)

        } catch(error) {
            console.error('Plaid error retrieving accounts for access token: ', error)

            return {
                status: 'error',
                data: error
            }
        }

        if (accountsResponse.accounts.length === 0) {
            return {
                status: 'error',
                message: 'No accounts were returned by the request.',
                accounts: []
            }
        }

        try {
            var accounts = await Promise.all(
                models.Account.upsertArray(
                    models.Account.fromPlaidArray(
                        accountsResponse.accounts,
                        user_id
                    ), {
                        where: {
                            plaid_id: this._id
                        }
                    }
                )
            )
        } catch(error) {
            console.error('Database error injecting Accounts from Plaid: ', error)

            return {
                status: 'error',
                data: error
            }
        }

        token.update({ last_account_pull: moment().format() })

        return {
            status: 'success',
            token: token.access_token,
            data: accounts
        }
    }))
}

module.exports = retrieveAccounts
