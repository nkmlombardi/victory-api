var plaidService = require('../services/plaid')

module.exports = {
    /**
     * Creates a user in the Plaid database via their bank account information.
     * An access token is returned.
     *
     * TODO: This endpoint currently only works for MFA accounts. It's also not
     * being used and thus is being belayed for other more important efforts.
     */
    postConnect: async function(req, res, next) {
        var response = await plaidService.connect(
            req.models,
            req.plaid,
            req.user.id,
            req.body.type,
            req.body.username,
            req.body.password
        )

        // Return success and generated PlaidToken
        return res.json({
            status: response.status,
            data: response.data
        })
    },


    /**
     * This endpoint is used to exchange a public token provided by the plaid link
     * service, for an access token that can be used to make requests on behalf
     * of a user for their financial information.
     */
    postExchange: async function(req, res, next) {
        var tokenResponse = await plaidService.exchange(
            req.models,
            req.plaid,
            req.user.id,
            req.body.public_token
        )

        var accountsResponse = await plaidService.accounts(
            req.models,
            req.plaid,
            req.user.id,

            // Array of single token to retrieve accounts for
            [tokenResponse.data]
        )
        
        // Return status and generated PlaidToken
        return res.json({
            status: req.status.success,
            token: tokenResponse.data,

            // accountsResponse returns an array of accoutRequests, we only
            // want the first one because we only sent one token
            data: accountsResponse[0].data
        })
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
