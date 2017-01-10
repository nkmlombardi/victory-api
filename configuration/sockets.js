var controllers = require('../controllers')
var services = require('../services')
var moment = require('moment')


module.exports = function(io, database) {
    io.on('connection', async function(socket) {
        console.log('User connected...')

        socket.on('disconnect', function() {
            console.log('User disconnected...')
        })

        // var datacenters = await database.connection.query(`SELECT * FROM BB_DATA_CENTER`)

        // datacenters.forEach(function(datacenter, index) {
        //     setInterval(function() {
        //         datacenter.status = { stable: Math.floor((Math.random() * 100) + 1) }
        //         datacenter.status.warning = Math.floor(((100 - datacenter.status.stable) / 3) * 2)
        //         datacenter.status.danger = Math.floor((100 - datacenter.status.stable) / 3)
        //         datacenter.health = []

        //         // Generate health history
        //         for (var i = 0; i < 24; i++) {
        //             datacenter.health.push({
        //                 date: moment().startOf('hour').subtract(i + 1, 'hour').format(),
        //                 status: Math.floor((Math.random() * 35) + 65)
        //             })
        //         }

        //         // console.log('datacenter:new', datacenter)

        //         socket.emit('datacenter:new', {
        //             data: datacenter
        //         })
        //     }, (Math.floor((Math.random() * 120) + 1)) * 500)
        // })
    })
}
