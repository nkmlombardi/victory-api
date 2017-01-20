// Dependencies
var express = require('express')
var http = require('http')
var socket = require('socket.io')
var colors = require('colors')

// Environment variables
var env = require('node-env-file')
env(__dirname + '/.environment/.public.env')
env(__dirname + '/.environment/.private.env')

// Instantiation
var config = require('./configuration')
var database = require('./database')(config.settings)
var app = express()
var server = http.createServer(app)
var io = socket.listen(server)

// Bootstrapping
config.middleware(app, database)
config.sockets(io, database)
config.routes(app)

// Execute server
server.listen(process.env.NODE_PORT, function() {
    console.log(('Listening on port ' + process.env.NODE_PORT + '.').green)

}).on('error', function(error) {
    if (error.code == 'EADDRINUSE') {
        console.log('Address in use. Is the server already running?'.red)
    }
})

module.exports = server
