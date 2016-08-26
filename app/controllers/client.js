var treebuilder = require('../lib/treebuilder.twostep');
var Promise = require("bluebird");

/*
    This resource does not include an endpoint to retrieve the Client's relation
    to Servers as there is no way to determine which Servers a Client exists on
    within a group of servers behind a load balancer, AKA a Cluster.
*/

module.exports = {
    getClientAll: function(req, res, next) {
        console.log('We got this far')

        req.models.client.findAll().then(function(clients) {
            return res.json(clients);
        });
    },

    getClientAllTree: function(req, res, next) {
        req.models.client.findAll({
            include: {
                model: req.models.project,
                include: {
                    model: req.models.origin,
                    include: {
                        model: req.models.target
                    }
                }
            }
        }).then(function(data) {
            res.json(data);
        });
    },

    getClient: function(req, res, next) {
        req.models.client.findById(req.params.id).then(function(clients) {
            return res.json(clients);
        });
    },

    getClientTree: function(req, res, next) {
        req.models.client.findOne({
            where: { client_id: req.params.id },
            include: {
                model: req.models.project,
                include: {
                    model: req.models.origin,
                    include: {
                        model: req.models.target
                    }
                }
            }
        }).then(function(data) {
            res.json(data);
        });
    },

    getClientProjects: function(req, res, next) {
        req.models.client.findById(req.params.id).then(function(client) {
            client.getProjects().then(function(projects) {
                return res.json(projects);
            });
        });
    },

    getClientOrigins: function(req, res, next) {
        req.models.project.findAll({
            attributes: ['project_id'],
            where: {
                client_id: req.params.id
            }
         }).then(function(projects) {
            // console.log(projects);
            req.models.origin.findAll({
                where: {
                    project_id: {
                        $in: projects
                    }
                }
            }).then(function(origins) {
                res.json(origins);
            });
        });
    },

    getClientTargets: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_TARGET WHERE origin_id IN (" +
                        "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id IN (" +
                            "SELECT project_id FROM BB_PROJECT WHERE client_id = :id" +
                        ")" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
        });
    },

    getClientClusters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                        "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id IN (" +
                            "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id IN (" +
                                "SELECT project_id FROM BB_PROJECT WHERE client_id = :id" +
                            ")" +
                        ")" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
        });
    },

    getClientDatacenters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_DATA_CENTER WHERE data_center_code IN (" +
                        "SELECT data_center FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                            "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id IN (" +
                                "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id IN (" +
                                    "SELECT project_id FROM BB_PROJECT WHERE client_id = :id" +
                                ")" +
                            ")" +
                        ")" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
        });
    }
};
