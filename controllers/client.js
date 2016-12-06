var Promise = require('bluebird')
var treebuilder = require('../services/treebuilder')

module.exports = {
    getClientAll: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_CLIENT`)
        })
    },

    getClientAllTree: async function(req, res, next) {
        var sql =   'SELECT C.client_id, P.project_id, O.origin_id, T.target_id ' +
                    'FROM BB_CLIENT C, BB_PROJECT P, BB_PROJECT_ORIGIN O, BB_PROJECT_TARGET T ' +
                    'WHERE C.client_id = P.client_id ' +
                        'AND P.project_id = O.project_id ' +
                        'AND O.origin_id = T.origin_id ' +
                    'ORDER BY 1, 2, 3, 4'

        var relations = await req.connection.query(sql)
        var resources = await Promise.props({
            clients:    req.connection.query('SELECT * FROM BB_CLIENT'),
            projects:   req.connection.query('SELECT * FROM BB_PROJECT'),
            origins:    req.connection.query('SELECT * FROM BB_PROJECT_ORIGIN'),
            targets:    req.connection.query('SELECT * FROM BB_PROJECT_TARGET')
        })

        return res.json({
            status: req.status.success,
            data: treebuilder(relations, resources)
        })
    },

    getClient: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_CLIENT WHERE client_id = ${req.params.id}`)
        })
    },

    getClientProjects: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_PROJECT WHERE client_id = ${req.params.id}`)
        })
    },

    getClientOrigins: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(
                `SELECT * FROM BB_PROJECT_ORIGIN WHERE project_id IN (` +
                    `SELECT project_id FROM BB_PROJECT WHERE client_id = ${req.params.id}` +
                `)`
            )
        })
    },

    getClientTargets: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(
                `SELECT * FROM BB_PROJECT_TARGET WHERE origin_id IN (` +
                    `SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id IN (` +
                        `SELECT project_id FROM BB_PROJECT WHERE client_id = ${req.params.id}` +
                    `)` +
                `)`
            )
        })
    },

    getClientClusters: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(
                `SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (` +
                    `SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id IN (` +
                        `SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id IN (` +
                            `SELECT project_id FROM BB_PROJECT WHERE client_id = ${req.params.id}` +
                        `)` +
                    `)` +
                `)`
            )
        })
    },

    getClientDatacenters: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(
                `SELECT * FROM BB_DATA_CENTER WHERE data_center_code IN (` +
                    `SELECT data_center FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (` +
                        `SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id IN (` +
                            `SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id IN (` +
                                `SELECT project_id FROM BB_PROJECT WHERE client_id = ${req.params.id}` +
                            `)` +
                        `)` +
                    `)` +
                `)`
            )
        })
    }
}
