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

    getOriginAllHealth: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await database.connection.query(
                `SELECT origin_id AS id, statistic_health_score AS health, health_dtm AS timestamp FROM BB_PROJECT_ORIGIN_HEALTH`
            )
        })
    }
}
