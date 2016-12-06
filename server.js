// Dependencies
var express = require('express')
var http = require('http')
var socketio = require('socket.io')
var colors = require('colors')

// Environment variables
var env = require('node-env-file')
env(__dirname + '/.environment/.public.env')
env(__dirname + '/.environment/.private.env')

// Instantiation
var config = require('./configuration')
var app = express()

// Bootstrapping
config.middleware(app, config.settings)
config.routes(app)

// Setup socket & deploy server
var server = http.createServer(app)
var io = socketio(server)

// Execute server
module.exports = server.listen(process.env.NODE_PORT, function() {
    console.log(('Listening on port ' + process.env.NODE_PORT).green)

}).on('error', function(error) {
    if (error.code == 'EADDRINUSE') {
        console.log('Address in use. Is the server already running?'.red)
    }
})
