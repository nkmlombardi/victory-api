var plaidService = require('../services/plaid');

module.exports = {
    postConnect: function(req, res, next) {

    },

    postExchange: function(req, res, next) {
        var response = plaidService.exchange(req.models, req.plaid, req.user.id, req.body.public_token);

        // Return success and generated PlaidToken
        return res.json({
            status: response.status,
            data: response.data
        });
    },

    postWebhook: function(req, res, next) {

    }
};
