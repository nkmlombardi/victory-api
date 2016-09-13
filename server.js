/*
    Will allow dependencies to be defined from the root
    of the project avoiding ../../../ calls.
 */
global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}

// Global Dependencies
var express = require('express');
var colors = require('colors')

// Configuration
var config = require('./config')();
var routes = require('./config/routes');

// Initialize Server
var app = express();
var httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer);

// Configure Middleware
config.middleware(app);

// Initialize Routes
routes(app);

// Execute Server
var server = httpServer.listen(config.settings.node.port, function() {
    if (process.env.NODE_ENV != 'testing') {
        console.log(('Listening on port ' + config.settings.node.port + ' in ' + process.env.NODE_ENV.toUpperCase() + ' mode.').green);
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
