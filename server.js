// Global Variables
require('dotenv').config();
process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

// Global Dependencies
var express     = require('express');
var colors      = require('colors')

// Configuration
var config      = require('./config')();
var routes      = require('./config/routes');

// Initialize Server
var app = express();

// Configure Middleware
config.middleware(app);

// Initialize Routes
routes(app);

var initialize = function() {
    // Execute Server
    var server = app.listen(config.settings.port, function() {
        if (process.env.NODE_ENV == 'development') {
            console.log(('Listening on port ' + config.settings.port + ' in ' + process.env.NODE_ENV.toUpperCase() + ' mode.').green);
        }

    }).on('error', function(e) {
        if (e.code == 'EADDRINUSE') {
            console.log('Address in use. Is the server already running?'.red);
        }
    });

    server.endpoints = app._router.stack.filter(function(r) {
        if (r.route && r.route.path) {
            return r.route.path;
        }
        return;
    });

    return server;
};

module.exports = initialize;
