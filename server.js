// Dependencies
var env = require('node-env-file')
var express = require('express.oi')
var colors = require('colors')

// Environment Variables
env(__dirname + '/.environment/.public.env')
env(__dirname + '/.environment/.private.env')

// Instantiation
var config = require('./configuration')
var app = express()
app.http().io();

// Bootstrapping
config.middleware(app, config.settings)
config.routes(app)

// Execute Server
var server = app.listen(process.env.NODE_PORT, function() {
    console.log(('Listening on port ' + process.env.NODE_PORT).green)

}).on('error', function(e) {
    if (e.code == 'EADDRINUSE') {
        console.log('Address in use. Is the server already running?'.red)
    }
})

module.exports = server
