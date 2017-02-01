// const controllers = require('../controllers')
// const services = require('../services')
// const moment = require('moment')

module.exports = (io, database) => {
    io.on('connection', async (socket) => {
        const emitters = []
        console.log('User connected...')

        socket.on('disconnect', () => {
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
            })
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
            })
        }, 3000))

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
            })
        }, 3000))

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

        /*
            Emit Target Healths
         */
        emitters.push(setInterval(async () => {
            console.log('targets:health event emitted to:', socket.id)
            socket.emit('targets:health', {
                status: 'success',
                data: await database.connection.query(`
                    SELECT
                        target_id                           AS id,
                        AVG(statistic_health_score)         AS health,
                        MAX(health_dtm)                     AS time
                    FROM        BB_PROJECT_TARGET_HEALTH
                    GROUP BY    id
                `)
            })
        }, 10000))
    })
}
