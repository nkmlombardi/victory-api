// Global Variables
var env = require('node-env-file')
env(__dirname + '/.environment/public.env')
env(__dirname + '/.environment/private.env')

// Global Dependencies
var express = require('express')
var colors = require('colors')

// Configuration
var config = require('./config')()
var routes = require('./config/routes')

// Initialize Server
var app = express()

// Configure Middleware
config.middleware(app)

// Initialize Routes
routes(app)

// Execute Server
var server = app.listen(config.settings.port, function() {
    if (process.env.NODE_ENV != 'testing') {
        console.log(('Listening on port ' + config.settings.port.blue + ' in a ' + process.env.NODE_ENV.blue + ' environment.'))
    }

}).on('error', function(e) {
    if (e.code == 'EADDRINUSE') {
        console.log('Address in use. Is the server already running?'.red)
    }
})

// For Testing
server.endpoints = app._router.stack.filter(function(r) {
    if (r.route && r.route.path) {
        return r.route.path
    }
    return
})

module.exports = server
