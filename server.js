// Global Variables
process.env.NODE_ENV = (process.env.NODE_ENV || 'development');

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

// Execute Server
var server = app.listen(config.settings.port, function() {
    if (process.env.NODE_ENV != 'testing') {
        console.log(('Listening on port ' + config.settings.port + ' in ' + process.env.NODE_ENV.toUpperCase() + ' mode.').green);
    }

}).on('error', function(e) {
    if (e.code == 'EADDRINUSE') {
        console.log('Address in use. Is the server already running?'.red);
    }
});

// For Testing
server.endpoints = app._router.stack.filter(function(r) {
    if (r.route && r.route.path) {
        return r.route.path;
    }
    return;
});

module.exports = server;
