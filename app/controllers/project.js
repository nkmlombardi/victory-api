var treebuilder = require('../lib/treebuilder/treebuilder.twostep');
var Promise = require("bluebird");

module.exports = {
    getProjectAll: function(req, res, next) {
        req.models.project.findAll().then(function(projects) {
            return res.json(projects);
        });
    },

    getProjectAllTree: function(req, res, next) {
        req.models.project.findAll({
            include: {
                model: req.models.origin,
                include: {
                    model: req.models.target
                }
            }
        }).then(function(data) {
            res.json(data);
        });
    },

    getProject: function(req, res, next) {
        req.models.project.findById(req.params.id).then(function(projects) {
            return res.json(projects);
        });
    },

    getProjectTree: function(req, res, next) {
        req.models.project.findOne({
            where: { project_id: req.params.id },
            include: {
                model: req.models.origin,
                include: {
                    model: req.models.target
                }
            }
        }).then(function(data) {
            res.json(data);
        });
    },

    getProjectClient: function(req, res, next) {
        req.models.project.findById(req.params.id).then(function(project) {
            project.getClient().then(function(client) {
                return res.json(client);
            });
        });
    },

    getProjectOrigins: function(req, res, next) {
        req.models.project.findById(req.params.id).then(function(project) {
            project.getOrigins().then(function(origins) {
                return res.json(origins);
            });
        });
    },

    getProjectTargets: function(req, res, next) {
        var sql = "SELECT * FROM BB_PROJECT_TARGET WHERE origin_id IN (SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id = :id)";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
        });
    },

    getProjectClusters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                        "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id IN (" +
                            "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id = :id" +
                        ")" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
        });
    },

    getProjectDatacenters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_DATA_CENTER WHERE data_center_code IN (" +
                        "SELECT data_center FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                            "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id IN (" +
                                "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id = :id" +
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
