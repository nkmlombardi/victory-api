// const controllers = require('../controllers')
// const services = require('../services')
// const moment = require('moment')

module.exports = (io, database) => {
    io.on('mysql', async (socket) => {
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
                data: await database.mysql.query(`
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
                data: await database.mysql.query(`
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
                data: await database.mysql.query(`
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
                data: await database.mysql.query(`
                    SELECT
                        health.origin_id                    AS id,
                        AVG(health.statistic_health_score)  AS health,
                        MAX(health.health_dtm)              AS time
                    FROM
                        BB_PROJECT_ORIGIN_HEALTH            AS health,
                        BB_PROJECT_ORIGIN                   AS resource
                    WHERE       health.origin_id = resource.origin_id
                        AND     resource.is_inactive = 0
                        AND     resource.is_hidden = 0
                    GROUP BY    id
                `)
            })
        }, 5000))

        /*
            Emit Target Healths
         */
        emitters.push(setInterval(async () => {
            console.log('targets:health event emitted to:', socket.id)
            socket.emit('targets:health', {
                status: 'success',
                data: await database.mysql.query(`
                    SELECT
                        health.target_id                    AS id,
                        AVG(health.statistic_health_score)  AS health,
                        MAX(health.health_dtm)              AS time
                    FROM
                        BB_PROJECT_TARGET_HEALTH            AS health,
                        BB_PROJECT_TARGET                   AS resource
                    WHERE       health.target_id = resource.target_id
                        AND     resource.is_inactive = 0
                        AND     resource.is_hidden = 0
                    GROUP BY    id
                `)
            })
        }, 10000))
    })
}
