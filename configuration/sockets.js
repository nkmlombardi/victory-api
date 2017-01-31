var controllers = require('../controllers')
var services = require('../services')
var moment = require('moment')


module.exports = function(io, database) {
    io.on('connection', async function(socket) {
        console.log('User connected...')

        var emitters = []

        socket.on('disconnect', function() {
            console.log('User disconnected...')

            emitters.forEach((emitter) => {
                clearInterval(emitter)
            })
        })

        socket.on('datacenter:health:history', async (id) => {
            console.log('Ayyy')

            socket.emit('datacenters:health', {
                    status: 'success',
                    data: await database.connection.query(`
                        SELECT      *
                        FROM        BB_DATA_CENTER_HEALTH_LOG
                        WHERE       data_center_code = '${id}'
                    `)
                }
            )
        })


        /*
            Emit Datacenter Healths
         */
        emitters.push(setInterval(async () => {
            console.log('datacenters:health event emitted to:', socket.id)
            socket.emit('datacenters:health', {
                    status: 'success',
                    data: await database.connection.query(`
                        SELECT
                            data_center_code                    AS id,
                            AVG(statistic_health_score)         AS health,
                            MAX(health_dtm)                     AS time
                        FROM        BB_DATA_CENTER_HEALTH
                        GROUP BY    id
                    `)
                }
            )
        }, 5000))


        /*
            Emit Cluster Healths
         */
        emitters.push(setInterval(async () => {
            console.log('clusters:health event emitted to:', socket.id)
            socket.emit('clusters:health', {
                    status: 'success',
                    data: await database.connection.query(`
                        SELECT
                            cluster_name                        AS id,
                            AVG(statistic_health_score)         AS health,
                            MAX(health_dtm)                     AS time
                        FROM        BB_ONELINK_CLUSTER_HEALTH
                        GROUP BY    id
                    `)
                }
            )
        }, 5000))


        /*
            Emit Origin Healths
         */
        emitters.push(setInterval(async () => {
            console.log('origins:health event emitted to:', socket.id)
            socket.emit('origins:health', {
                    status: 'success',
                    data: await database.connection.query(`
                        SELECT
                            origin_id                           AS id,
                            AVG(statistic_health_score)         AS health,
                            MAX(health_dtm)                     AS time
                        FROM        BB_PROJECT_ORIGIN_HEALTH
                        GROUP BY    id
                    `)
                }
            )
        }, 5000))
    })
}
