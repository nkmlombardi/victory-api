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
    app.route('/')
        .get(function(req, res, next) { res.send('ok'); })
        .post(function(req, res, next) { res.json(req.body); });

    /* Auth Token Resource */
    app.route('/v1/authenticate')
        .post(controllers.auth.isCredential, controllers.token.postSelfToken);


    /* Users Endpoint */
    app.route('/v1/users')
        .post(controllers.user.postUser);

    /* Transactions Resource */
    app.route('/v1/transactions/self')
        .get(controllers.auth.isBearer, controllers.transaction.getSelfAll);
    app.route('/v1/transactions/self/accounts')
        .get(controllers.auth.isBearer, controllers.transaction.getSelfAllWithAccounts);
    app.route('/v1/transactions/self/plaid')
        .post(controllers.auth.isBearer, controllers.transaction.postPlaidTransactions);

    // app.route('/v1/transactions/self/:id')
    //     .get(controllers.auth.isBearer, controllers.transaction.getSelf)
    //     .patch(controllers.auth.isBearer, controllers.transaction.patchSelf);

    /* Accounts Resource */
    app.route('/v1/accounts/self')
        .get(controllers.auth.isBearer, controllers.account.getSelfAll);
    app.route('/v1/accounts/self/transactions')
        .get(controllers.auth.isBearer, controllers.account.getSelfAllWithTransactions);
    app.route('/v1/accounts/self/plaid')
        .post(controllers.auth.isBearer, controllers.account.postPlaidAccounts);
    // app.route('/v1/accounts/self/:id')
    //     .get(controllers.auth.isBearer, controllers.account.getSelf)
    //     .post(controllers.auth.isBearer, controllers.account.postSelf)
    //     .patch(controllers.auth.isBearer, controllers.account.patchSelf);

    /* Plaid Services */
    app.route('/v1/plaid/connect')
        .post(controllers.auth.isBearer, services.plaid.connect);
    app.route('/v1/plaid/exchange')
        .post(controllers.auth.isBearer, services.plaid.exchange);
    app.route('/v1/plaid/webhook/:id')
        .post(services.plaid.webhook);

    /* Category Resource */
    app.route('/v1/categories/')
        .get(controllers.auth.isBearer, controllers.category.getAll);
    app.route('/v1/categories/primary')
        .get(controllers.auth.isBearer, controllers.category.getAllPrimary);

};
