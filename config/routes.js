var settings = require('../config')().settings;
var controllers = require('../app/controllers');
var services = require('../app/services');
var cache = require('apicache').options(settings.cache).middleware;


/*
    This file contains all of the API's resource endpoints grouped in logical order.
    Each endpoint needs to pass in an authentication method that validates the request.
 */
module.exports = function(app) {

    /* Base Endpoint */
    app.route('/').get(function(req, res, next) { res.send('ok'); });

    /* Auth Token Resource */
    app.route('/authenticate')
        .post(controllers.auth.isCredential, controllers.token.postSelfToken);

    /* Transactions Resource */
    app.route('/transactions/self')
        .get(controllers.auth.isBearer, controllers.transaction.getSelfAll);
    app.route('/transactions/self/:id')
        .get(controllers.auth.isBearer, controllers.transaction.getSelf)
        .patch(controllers.auth.isBearer, controllers.transaction.patchSelf);

    /* Accounts Resource */
    app.route('/accounts/self')
        .get(controllers.auth.isBearer, controllers.account.getSelfAll);
    app.route('/accounts/self/:id')
        .get(controllers.auth.isBearer, controllers.account.getSelf)
        .post(controllers.auth.isBearer, controllers.account.postSelf)
        .patch(controllers.auth.isBearer, controllers.account.patchSelf);

    /* Plaid Services */
    app.route('/plaid/transactions')
        .post(controllers.auth.isBearer, services.plaid.postSelfConnect);
    app.route('/plaid/webhook')
        .post(controllers.auth.isBearer, services.plaid.postWebhook);
};
