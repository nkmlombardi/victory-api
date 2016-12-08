var controllers = require('../controllers')
var services = require('../services')
var cache = require('apicache').middleware

module.exports = function(app, io) {
    io.on('connection', function(socket) {
        console.log('a user connected')

        socket.on('disconnect', function() {
            console.log('user disconnected')
        })
    })
}
