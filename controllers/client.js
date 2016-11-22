var treebuilder = require('../lib/treebuilder/treebuilder.twostep');

module.exports = {
    getClientAll: function(req, res, next) {
        req.models.client.findAll()
            .then(function(clients) {
                return res.status(req.httpStatus.OK)
                    .json({
                        status: req.status.success,
                        data: clients
                    });
            }).error(function(error) {
                return res.status(req.httpStatus.INTERNAL_SERVER_ERROR)
                    .json({
                        status: req.status.error,
                        message: error
                    });
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
        }).then(function(clientsTree) {
            res.status(req.httpStatus.OK)
                .json({
                    status: req.status.success,
                    data: clientsTree
                });
        });
    },

    getClient: function(req, res, next) {
        req.models.client.findById(req.params.id)
            .then(function(client) {
                return res.status(req.httpStatus.OK)
                    .json({
                        status: req.status.success,
                        data: client
                    });
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
        }).then(function(clientTree) {
            res.status(req.httpStatus.OK)
                .json({
                    status: req.status.success,
                    data: clientTree
                });
        });
    },

    getClientProjects: function(req, res, next) {
        req.models.client.findById(req.params.id).then(function(client) {
            client.getProjects().then(function(projects) {
                return res.status(req.httpStatus.OK)
                    .json({
                        status: req.status.success,
                        data: projects
                    });
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
                res.status(req.httpStatus.OK)
                    .json({
                        status: req.status.success,
                        data: origins
                    });
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
            return res.status(req.httpStatus.OK)
                .json({
                    status: req.status.success,
                    data: projects
                });
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
            return res.status(req.httpStatus.OK)
                .json({
                    status: req.status.success,
                    data: projects
                });
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
            return res.status(req.httpStatus.OK)
                .json({
                    status: req.status.success,
                    data: projects
                });
        });
    }
};
