var treebuilder = require('../services/treebuilder');
var Promise = require("bluebird");

module.exports = {
    getClusters: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER`)
        })
    },

    getClustersTree: function(req, res, next) {
        var sql =   'SELECT C.cluster_name AS cluster_id, S.internal_ip AS server_id ' +
                    'FROM BB_ONELINK_CLUSTER C, BB_ONELINK_SERVER S ' +
                    'WHERE C.cluster_name = S.cluster_name ' +
                    'ORDER BY 1, 2;';

        req.connection.query(sql)
            .then(function(relations) {
                Promise.props({
                    clusters:       req.connection.query("SELECT *, cluster_name AS cluster_id FROM BB_ONELINK_CLUSTER"),
                    servers:        req.connection.query("SELECT *, internal_ip AS server_id, cluster_name AS cluster_id FROM BB_ONELINK_SERVER"),
                }).then(function(data) {
                    return res.json(treebuilder.build(relations, data));
                });
            })
    },

    getCluster: function(req, res, next) {
        req.models.cluster.findById(req.params.id).then(function(clusters) {
            return res.json(clusters);
        });
    },

    getClusterClients: function(req, res, next) {
        var sql =   "SELECT * FROM BB_CLIENT WHERE client_id IN (" +
                        "SELECT client_id FROM BB_PROJECT WHERE project_id IN (" +
                            "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                                "SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name = :id" +
                            ")" +
                        ")" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(clients) {
            return res.json(clients);
        });
    },

    getClusterProjects: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT WHERE project_id IN (" +
                        "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                            "SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name = :id" +
                        ")" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(project) {
            return res.json(project);
        });
    },

    getClusterOrigins: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                        "SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name = :id" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(origins) {
            return res.json(origins);
        });
    },

    getClusterTargets: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_TARGET WHERE cluster_name = :id";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(clusters) {
            return res.json(clusters);
        });
    },

    getClusterServers: function(req, res, next) {
        var sql =   "SELECT * FROM BB_ONELINK_SERVER WHERE cluster_name  = :id";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(servers) {
            return res.json(servers);
        });
    },

    getClusterDatacenter: function(req, res, next) {
        var sql =   "SELECT * FROM BB_DATA_CENTER WHERE data_center_code IN (" +
                        "SELECT data_center FROM BB_ONELINK_CLUSTER WHERE cluster_name = :id" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(datacenters) {
            return res.json(datacenters[0]);
        });
    }
};
