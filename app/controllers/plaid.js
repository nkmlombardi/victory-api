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
        var response = await plaidService.exchange(
            req.models,
            req.plaid,
            req.user.id,
            req.body.public_token
        )

        // Return status and generated PlaidToken
        return res.json({
            status: response.status,
            data: response.data
        })
    },

    postWebhook: function(req, res, next) {

    },

    postRetrieveAccounts: async function(req, res, next) {
        var response = await plaidService.accounts(
            req.models,
            req.plaid,
            req.user.id,
            req.user.access_token
        )

        return res.json({
            status: response.status,
            data: response.data
        })
    },

    postRetrieveTransactions: async function(req, res, next) {
        var response = await plaidService.transactions(
            req.models,
            req.plaid,
            req.user.id,
            await req.user.getPlaidTokens()
        )

        console.log('getPlaidTokens: ', await req.user.getPlaidTokens())
        console.log('Transactions Service Response: ', response)

        return res.json({
            status: response.status,
            data: response.data
        })
    }
}
