module.exports = {
    getProjects: function(req, res, next) {
        req.models.project.findAll().then(function(projects) {
            return res.json(projects);
        });
    },

    getProject: function(req, res, next) {
        req.models.project.findById(req.params.id).then(function(projects) {
            return res.json(projects);
        });
    },

    getProjectClient: function(req, res, next) {
        var sql = "SELECT * FROM BB_CLIENT WHERE client_id = :id";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(client) {
            return res.json(client);
        });
    },

    getProjectOrigins: function(req, res, next) {
        var sql = "SELECT * FROM BB_PROJECT_ORIGIN WHERE project_id = :id";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
        });
    },

    getProjectTargets: function(req, res, next) {
        var sql = "SELECT * FROM BB_PROJECT_TARGET WHERE origin_id IN (SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id = :id)";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
        });
    },

    // getProjectServers: function(req, res, next) {
    //     var sql =   "SELECT * FROM BB_ONELINK_SERVER WHERE external_ip IN (" +
    //                     "SELECT external_ip FROM BB_ONELINK_CNAME WHERE onelink_cname IN (" +
    //                         "SELECT target_live_cname FROM BB_ONELINK_TARGET WHERE origin_id IN (" +
    //                             "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id = :id" +
    //                         ")" +
    //                     ")" +
    //                 ")";

    //     req.db.sequelize.query(sql, {
    //         replacements: { id: req.params.id },
    //         type: req.db.sequelize.QueryTypes.SELECT

    //     }).then(function(servers) {
    //         return res.json(servers);
    //     });
    // },

    getProjectClusters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                        "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id IN (" +
                            "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id = :id" +
                        ")" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

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

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
        });
    }
};
