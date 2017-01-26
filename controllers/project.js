var treebuilder = require('../services/treebuilder');
var Promise = require("bluebird");

module.exports = {
    getProjectAll: function(request, response, next) {
        request.models.project.findAll().then(function(projects) {
            return response.json(projects);
        });
    },

    getProjectAllTree: function(request, response, next) {
        request.models.project.findAll({
            include: {
                model: request.models.origin,
                include: {
                    model: request.models.target
                }
            }
        }).then(function(data) {
            response.json(data);
        });
    },

    getProject: function(request, response, next) {
        request.models.project.findById(request.params.id).then(function(projects) {
            return response.json(projects);
        });
    },

    getProjectTree: function(request, response, next) {
        request.models.project.findOne({
            where: { project_id: request.params.id },
            include: {
                model: request.models.origin,
                include: {
                    model: request.models.target
                }
            }
        }).then(function(data) {
            response.json(data);
        });
    },

    getProjectClient: function(request, response, next) {
        request.models.project.findById(request.params.id).then(function(project) {
            project.getClient().then(function(client) {
                return response.json(client);
            });
        });
    },

    getProjectOrigins: function(request, response, next) {
        request.models.project.findById(request.params.id).then(function(project) {
            project.getOrigins().then(function(origins) {
                return response.json(origins);
            });
        });
    },

    getProjectTargets: function(request, response, next) {
        var sql = "SELECT * FROM BB_PROJECT_TARGET WHERE origin_id IN (SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id = :id)";

        request.sequelize.query(sql, {
            replacements: { id: request.params.id },
            type: request.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return response.json(projects);
        });
    },

    getProjectClusters: function(request, response, next) {
        var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                        "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id IN (" +
                            "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id = :id" +
                        ")" +
                    ")";

        request.sequelize.query(sql, {
            replacements: { id: request.params.id },
            type: request.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return response.json(projects);
        });
    },

    getProjectDatacenters: function(request, response, next) {
        var sql =   "SELECT * FROM BB_DATA_CENTER WHERE data_center_code IN (" +
                        "SELECT data_center FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                            "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id IN (" +
                                "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id = :id" +
                            ")" +
                        ")" +
                    ")";

        request.sequelize.query(sql, {
            replacements: { id: request.params.id },
            type: request.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return response.json(projects);
        });
    }
};
