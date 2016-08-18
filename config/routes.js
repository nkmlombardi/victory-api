var settings = require('../config')().settings;
var controllers = require('../app/controllers');
var cache = require('apicache').options(settings.cache).middleware;


/*
    This file contains all of the API's resource endpoints grouped in logical order.
    Each endpoint needs to pass in an authentication method that validates the request.
 */
module.exports = function(app) {

    // Base Endpoint
    app.route('/').get(function(req, res, next) {
        req.models.plaidToken.findAll()
            .then(function(users) {
                res.json(users);
            }).error(function(error) {
                res.send(error);
            });
    });
};
