// Global Variables
process.env.NODE_ENV = (process.env.NODE_ENV || 'testing').toLowerCase();

// Global Dependencies
var path        = require('path');
var express     = require('express');
var colors      = require('colors')
var request     = require('request');

// Configuration
var config      = require('../config')();
var routes      = require('../config/routes');


var app = express();

config.middleware(app);
routes(app);

console.log('==================');
console.log('Checking Endpoints'.yellow);
console.log('==================');

/*
    Make HTTP Request to each Endpoint to make sure it is functional.
 */
app._router.stack.forEach(function(r) {
    if (r.route && r.route.path) {
        request({
            url: 'http://localhost:' + config.settings.port + r.route.path,
            headers: {
                'apikey': 'Development'
            }
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log((r.route.path + ': ' + response.statusCode).green);
            } else {
                console.log((r.route.path + ': ' + error).red);
            }
        });
    }
});
