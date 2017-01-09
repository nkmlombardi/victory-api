var treebuilder = require('../services/treebuilder')
var Promise = require("bluebird")

module.exports = {
    getOriginAll: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_PROJECT_ORIGIN`)
        })
    },

    getOriginAllTree: function(req, res, next) {
        req.models.origin.findAll({
            include: {
                model: req.models.target
            }
        }).then(function(data) {
            res.json(data)
        })
    },

    getOrigin: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id = ${req.params.id}`)
        })
    },

    getOriginTree: function(req, res, next) {
        req.models.origin.findOne({
            where: { origin_id: req.params.id },
            include: {
                model: req.models.target
            }
        }).then(function(data) {
            res.json(data)
        })
    },

    getOriginClient: function(req, res, next) {
        var sql =   "SELECT * FROM BB_CLIENT WHERE client_id IN (" +
                        "SELECT client_id FROM BB_PROJECT WHERE project_id IN (" +
                            "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id = :id" +
                        ")" +
                    ")"

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(client) {
            return res.json(client[0])
        })
    },

    getOriginProject: function(req, res, next) {
        req.models.origin.findById(req.params.id).then(function(origin) {
            origin.getProject().then(function(project) {
                return res.json(project)
            })
        })
    },

    getOriginTargets: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_PROJECT_TARGET WHERE origin_id = ${req.params.id}`)
        })
    },

    getOriginClusters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                        "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id = :id" +
                    ")"

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(clusters) {
            return res.json(clusters)
        })
    },

    getOriginDatacenters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_DATA_CENTER WHERE data_center_code IN (" +
                        "SELECT data_center FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                            "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id = :id" +
                        ")" +
                    ")"

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(datacenters) {
            return res.json(datacenters)
        })
    }
}
