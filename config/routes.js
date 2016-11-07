var settings = require('../config')().settings
var controllers = require('../app/controllers')
var cache = require('apicache').options(settings.cache).middleware


/*
    This file contains all of the API's resource endpoints grouped in logical order.
    Each endpoint needs to pass in an authentication method that validates the request.
 */
module.exports = function(app) {

    /* Base Endpoint */
    app.route('/')
        .get(function(req, res, next) {
            res.send('ok')
        })
        .post(function(req, res, next) {
            res.json(req.body)
        })


    /* Auth Token Resource */
    app.route('/v1/authenticate')
        .post(controllers.auth.isCredential, controllers.token.postSelfToken)


    /* Users Endpoint */
    app.route('/v1/users')
        .post(controllers.user.postUser)


    /* Transactions Resource */
    app.route('/v1/transactions/self')
        .get(controllers.auth.isBearer, controllers.transaction.getSelfAll)
    app.route('/v1/transactions/self/all')
        .get(controllers.auth.isBearer, controllers.transaction.getSelfAllWithAll)
    app.route('/v1/transactions/self/accounts')
        .get(controllers.auth.isBearer, controllers.transaction.getSelfAllWithAccounts)
    app.route('/v1/transactions/self/plaid')
        .post(controllers.auth.isBearer, controllers.transaction.postPlaidTransactions)


    /* Accounts Resource */
    app.route('/v1/accounts/self')
        .get(controllers.auth.isBearer, controllers.account.getSelfAll)
    app.route('/v1/accounts/self/transactions')
        .get(controllers.auth.isBearer, controllers.account.getSelfAllWithTransactions)
    app.route('/v1/accounts/self/plaid')
        .post(controllers.auth.isBearer, controllers.account.postPlaidAccounts)


    /* Plaid Services */
    app.route('/v1/plaid/connect')
        .post(controllers.auth.isBearer, controllers.plaid.postConnect)
    app.route('/v1/plaid/exchange')
        .post(controllers.auth.isBearer, controllers.plaid.postExchange)
    app.route('/v1/plaid/webhook/:id')
        .post( /*   Unauthenticated    */ controllers.plaid.postWebhook)


    /* Category Resource */
    app.route('/v1/categories/')
        .get(controllers.auth.isBearer, controllers.category.getAll)
    app.route('/v1/categories/primary')
        .get(controllers.auth.isBearer, controllers.category.getAllPrimary)
    app.route('/v1/categories/self/transactions')
        .get(controllers.auth.isBearer, controllers.category.getAllWithTransactions)


    /* Scenario Resource */
    app.route('/v1/scenarios/self')
        .get(controllers.auth.isBearer, controllers.scenario.getSelfAll)
        .post(controllers.auth.isBearer, controllers.scenario.postSelf)
    app.route('/v1/scenarios/self/budgets')
        .get(controllers.auth.isBearer, controllers.scenario.getSelfAllWithBudgets)
    app.route('/v1/scenarios/self/category')
        .get(controllers.auth.isBearer, controllers.scenario.getSelfAllWithCategory)
    app.route('/v1/scenarios/self/transactions')
        .get(controllers.auth.isBearer, controllers.scenario.getSelfAllWithTransactions)


    /* Budget Resource */
    app.route('/v1/budgets/self')
        .get(controllers.auth.isBearer, controllers.budget.getSelfAll)
    app.route('/v1/budgets/self/transactions')
        .get(controllers.auth.isBearer, controllers.budget.getSelfAllWithTransactions)

}
