const database = require('../database').state

module.exports = {
    /**
     * This endpoint is used to exchange a public token provided by the plaid link
     * service, for an access token that can be used to make requests on behalf
     * of a user for their financial information.
     */
    postExchange: async function(user, token) {
        // Now that the user has provided their bank account login information
        // on the client side directly to plaid, we are given a public token
        // that we can use to exchange with the plaid api for a more "private"
        // access_token that we shouldn't be sharing with anyone.
        var tokenResponse = await plaidService.exchange(user.id, token)

        // Now that we've generated a PlaidToken, let's utilize the plaid
        // accounts service to retrieve Accounts associated with the PlaidToken.
        // Array of single token to retrieve accounts for
        var accountsResponse = await plaidService.accounts(user.id, [tokenResponse.data])

        // We simply want to query for Transactions and inject them, we don't
        // want to hang the request while waiting for them.
        // Array of single token to retrieve Accounts for
        plaidService.transactions(user.id, [tokenResponse.data])

        // Return status and generated PlaidToken
        return {
            status: req.status.success,
            token: tokenResponse.data,

            // accountsResponse returns an array of accoutRequests, we only
            // want the first one because we only sent one token
            data: accountsResponse[0].data
        }
    },


    postWebhook: function(req, res, next) {

    },


    getRetrieveAccounts: async function(req, res, next) {
        var tokens = await req.user.getPlaidTokens()

        if (!tokens || tokens.length === 0) {
            return res.json({
                status: req.status.error,
                data: {
                    message: 'User has no associated tokens on the Plaid system.'
                }
            })
        }

        var response = await plaidService.accounts(
            req.models,
            req.plaid,
            req.user.id,
            tokens
        )

        return res.json({
            status: req.status.success,
            data: response
        })
    },


    /**
     * Iterate through each of the User's PlaidTokens and retrieve the inject the
     * transactions for each of them. Returns all transactions to the requester
     * afterwards.
     *
     * TODO: Currently not working as intended. Always makes requests to Plaid
     * using a date range based on the PlaidToken. The Plaid demo account doesn't
     * have recent transactions, so this is difficult to test. Will need to return
     * to this later.
     */
    getRetrieveTransactions: async function(req, res, next) {
        var tokens = await req.user.getPlaidTokens()

        if (!tokens || tokens.length === 0) {
            return res.json({
                status: req.status.error,
                data: {
                    message: 'User has no associated tokens on the Plaid system.'
                }
            })
        }

        var response = await plaidService.transactions(
            req.models,
            req.plaid,
            req.user.id,
            tokens
        )

        console.log(response)

        return res.json({
            status: req.status.success,
            data: response
        })
    }
}
