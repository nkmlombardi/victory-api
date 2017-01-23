var treebuilder = require('../services/treebuilder')
var Promise = require("bluebird")

module.exports = {
    getOriginAll: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_PROJECT_ORIGIN`)
        })
    },

    getOrigin: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id = ${req.params.id}`)
        })
    },

    getOriginTargets: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_PROJECT_TARGET WHERE origin_id = ${req.params.id}`)
        })
    },

    getOriginHealth: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`
                SELECT
                    origin_id                   AS id,
                    statistic_health_score      AS health,
                    health_dtm                  AS timestamp
                FROM        BB_PROJECT_ORIGIN_HEALTH
                WHERE       origin_id = ${req.params.id}
                ORDER BY    health_dtm DESC
            `)
        })
    },

    getOriginAllHealth: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`
                SELECT
                    DISTINCT origin_id,
                    AVG(statistic_health_score)     AS health_percent,
                    MAX(health_dtm)                 AS health_dtm
                FROM        BB_PROJECT_ORIGIN_HEALTH
                GROUP BY    origin_id
            `)
        })
    }
}
