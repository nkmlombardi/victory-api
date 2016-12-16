var treebuilder = require('../services/treebuilder')
var Promise = require('bluebird')

module.exports = {
    getDatacenters: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_DATA_CENTER`)
        })
    },

    getDatacentersTree: async function(req, res, next) {
        var sql =   'SELECT D.data_center_code AS datacenter_id, C.cluster_name AS cluster_id, S.internal_ip AS server_id ' +
            'FROM BB_DATA_CENTER D, BB_ONELINK_CLUSTER C, BB_ONELINK_SERVER S ' +
            'WHERE D.data_center_code = C.data_center ' +
                'AND C.cluster_name = S.cluster_name ' +
            'ORDER BY 1, 2, 3'

        return res.json({
            status: req.status.success,
            data: treebuilder(await req.connection.query(sql), await Promise.props({
                datacenters:    req.connection.query(`SELECT *, data_center_code AS datacenter_id FROM BB_DATA_CENTER`),
                clusters:       req.connection.query(`SELECT *, cluster_name AS cluster_id, data_center AS datacenter_id FROM BB_ONELINK_CLUSTER`),
                servers:        req.connection.query(`SELECT *, internal_ip AS server_id, cluster_name AS cluster_id FROM BB_ONELINK_SERVER`),
            }))
        })
    },

    getDatacenter: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: (await req.connection.query(`SELECT * FROM BB_DATA_CENTER WHERE data_center_code = '${req.params.id}'`))[0]
        })
    },

    getDatacenterClients: async function(req, res, next) {
        var sql =   `SELECT * FROM BB_CLIENT WHERE client_id IN (` +
                        `SELECT client_id FROM BB_PROJECT WHERE project_id IN (` +
                            `SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (` +
                                `SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name IN (` +
                                    `SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = '${req.params.id}'` +
                                `)` +
                            `)` +
                        `)` +
                    `)`

        return res.json({
            status: req.status.success,
            data: await req.connection.query(sql)
        })
    },

    getDatacenterProjects: async function(req, res, next) {
        var sql =   `SELECT * FROM BB_PROJECT WHERE project_id IN (` +
                        `SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (` +
                            `SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name IN (` +
                                `SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = '${req.params.id}'` +
                            `)` +
                        `)` +
                    `)`

        return res.json({
            status: req.status.success,
            data: await req.connection.query(sql)
        })
    },

    getDatacenterOrigins: async function(req, res, next) {
        var sql =   `SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id IN (` +
                        `SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name IN (` +
                            `SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = '${req.params.id}'` +
                        `)` +
                    `)`

        return res.json({
            status: req.status.success,
            data: await req.connection.query(sql)
        })
    },

    getDatacenterTargets: async function(req, res, next) {
        var sql =   `SELECT * FROM BB_PROJECT_TARGET WHERE cluster_name IN (` +
                        `SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = '${req.params.id}'` +
                    `)`

        return res.json({
            status: req.status.success,
            data: await req.connection.query(sql)
        })
    },

    getDatacenterServers: async function(req, res, next) {
        var sql =   `SELECT * FROM BB_ONELINK_SERVER WHERE cluster_name IN (` +
                        `SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = '${req.params.id}'` +
                    `)`

        return res.json({
            status: req.status.success,
            data: await req.connection.query(sql)
        })
    },

    getDatacenterClusters: async function(req, res, next) {
        var sql = `SELECT * FROM BB_ONELINK_CLUSTER WHERE data_center = '${req.params.id}'`

        return res.json({
            status: req.status.success,
            data: await req.connection.query(sql)
        })
    }
}
