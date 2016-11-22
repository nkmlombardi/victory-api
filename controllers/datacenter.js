var treebuilder = require('../services/treebuilder');
var Promise = require("bluebird");

module.exports = {
    getDatacenters: function(req, res, next) {
        req.connection.query("SELECT * FROM BB_DATA_CENTER")
            .then(function(datacenters) {
                return res.json({
                    status: req.status.success,
                    data: datacenters
                })
            })
    },

    // getDatacentersTree: function(req, res, next) {
    //     var sql =   'SELECT D.data_center_code AS datacenter_id, C.cluster_name AS cluster_id, S.internal_ip AS server_id ' +
    //                 'FROM BB_DATA_CENTER D, BB_ONELINK_CLUSTER C, BB_ONELINK_SERVER S ' +
    //                 'WHERE D.data_center_code = C.data_center ' +
    //                     'AND C.cluster_name = S.cluster_name ' +
    //                 'ORDER BY 1, 2, 3;';

    //     req.connection.query(sql)
    //         .then(function(relations) {
    //             Promise.props({
    //                 datacenters:    req.connection.query("SELECT *, data_center_code AS datacenter_id FROM BB_DATA_CENTER"),
    //                 clusters:       req.connection.query("SELECT *, cluster_name AS cluster_id, data_center AS datacenter_id FROM BB_ONELINK_CLUSTER"),
    //                 servers:        req.connection.query("SELECT *, internal_ip AS server_id, cluster_name AS cluster_id FROM BB_ONELINK_SERVER"),
    //             }).then(function(data) {
    //                 return res.json(treebuilder(relations, data));
    //             });
    //         })
    // },

    // getDatacenter: function(req, res, next) {
    //     req.models.datacenter.findById(req.params.id).then(function(datacenter) {
    //         return res.json(datacenter);
    //     });
    // },

    // getDatacenterClients: function(req, res, next) {
    //     var sql =   "SELECT * FROM BB_CLIENT WHERE client_id IN (" +
    //                     "SELECT client_id FROM BB_PROJECT WHERE project_id IN (" +
    //                         "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
    //                             "SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name IN (" +
    //                                 "SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = :id" +
    //                             ")" +
    //                         ")" +
    //                     ")" +
    //                 ")";

    //     req.sequelize.query(sql, {
    //         replacements: { id: req.params.id },
    //         type: req.sequelize.QueryTypes.SELECT

    //     }).then(function(datacenters) {
    //         return res.json(datacenters);
    //     });
    // },

    // getDatacenterProjects: function(req, res, next) {
    //     var sql =   "SELECT * FROM BB_PROJECT WHERE project_id IN (" +
    //                     "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
    //                         "SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name IN (" +
    //                             "SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = :id" +
    //                         ")" +
    //                     ")" +
    //                 ")";

    //     req.sequelize.query(sql, {
    //         replacements: { id: req.params.id },
    //         type: req.sequelize.QueryTypes.SELECT

    //     }).then(function(datacenters) {
    //         return res.json(datacenters);
    //     });
    // },

    // getDatacenterOrigins: function(req, res, next) {
    //     var sql =   "SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
    //                     "SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name IN (" +
    //                         "SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = :id" +
    //                     ")" +
    //                 ")";

    //     req.sequelize.query(sql, {
    //         replacements: { id: req.params.id },
    //         type: req.sequelize.QueryTypes.SELECT

    //     }).then(function(datacenters) {
    //         return res.json(datacenters);
    //     });
    // },

    // getDatacenterTargets: function(req, res, next) {
    //     var sql =   "SELECT * FROM BB_PROJECT_TARGET WHERE cluster_name IN (" +
    //                     "SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = :id" +
    //                 ")";

    //     req.sequelize.query(sql, {
    //         replacements: { id: req.params.id },
    //         type: req.sequelize.QueryTypes.SELECT

    //     }).then(function(datacenters) {
    //         return res.json(datacenters);
    //     });
    // },

    // getDatacenterServers: function(req, res, next) {
    //     var sql =   "SELECT * FROM BB_ONELINK_SERVER WHERE cluster_name IN (" +
    //                     "SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = :id" +
    //                 ")";

    //     req.sequelize.query(sql, {
    //         replacements: { id: req.params.id },
    //         type: req.sequelize.QueryTypes.SELECT

    //     }).then(function(servers) {
    //         return res.json(servers);
    //     });
    // },

    // getDatacenterClusters: function(req, res, next) {
    //     var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE data_center = :id";

    //     req.sequelize.query(sql, {
    //         replacements: { id: req.params.id },
    //         type: req.sequelize.QueryTypes.SELECT

    //     }).then(function(clusters) {
    //         return res.json(clusters);
    //     });
    // }
}
