var settings = require('../config')().settings;
var controllers = require('../app/controllers');
var services = require('../app/services');
var cache = require('apicache').options(settings.cache).middleware;


/*
    This file contains all of the API's resource endpoints grouped in logical order.
    Each endpoint needs to pass in an authentication method that validates the request.
 */
module.exports = function(app) {

    app.route('/authenticate').post(controllers.auth.isAuthenticated, controllers.token.postSelfToken);


    // Base Endpoint
    app.route('/').get(function(req, res, next) {
        res.send('ok');
    });

    app.route('/bearer').get(controllers.auth.isBearerAuthenticated, function(req, res, next) {
        res.json(req.user);
    });

    app.route('/plaid/transactions').post(controllers.auth.isBearerAuthenticated, controllers.user.postConnectSelfUser);
};
