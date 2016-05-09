// Global Variables
require('dotenv').config();
process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

// Global Dependencies
var path        = require('path');
var express     = require('express');
var colors      = require('colors')

// Configuration
var config      = require('./config')();
var routes      = require('./config/routes');

module.exports.start = function(done) {
    var app = express();

    config.middleware(app);
    routes(app);

    app.listen(config.settings.port, function() {
        console.log(('Listening on port ' + config.settings.port + ' in ' + process.env.NODE_ENV.toUpperCase() + ' mode.').green);

        if (done) { return done(null, app, server); }

    }).on('error', function(e) {
        if (e.code == 'EADDRINUSE') {
            console.log('Address in use. Is the server already running?'.red);
        }

        if (done) { return done(e); }
    });
}

// If someone runs: "node server.js" then automatically start the server
if (path.basename(process.argv[1], '.js') == path.basename(__filename, '.js')) {
    module.exports.start()
}
