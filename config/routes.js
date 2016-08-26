var settings = require('../config')().settings;
var controllers = require('../app/controllers');
var cache = require('apicache').options(settings.cache).middleware;


/*
    This file contains all of the API's resource endpoints grouped in logical order.
    Each endpoint needs to pass in an authentication method that validates the request.
 */
module.exports = function(app) {

    app.route('/authenticate').post(controllers.auth.checkCredentials, controllers.token.postToken);


    // Base Endpoint
    app.route('/').get(controllers.auth.checkToken, function(req, res, next) {
        res.json(req.user);
    });
};
