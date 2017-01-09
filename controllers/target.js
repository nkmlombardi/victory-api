module.exports = {
    getTargets: function(req, res, next) {
        req.models.target.findAll().then(function(targets) {
            return res.json(targets);
        });
    },

    getTarget: function(req, res, next) {
        req.models.target.findById(req.params.id).then(function(targets) {
            return res.json(targets);
        });
    },

    getTargetClient: function(req, res, next) {
        var sql =   "SELECT * FROM BB_CLIENT WHERE client_id IN (" +
                        "SELECT client_id FROM BB_PROJECT WHERE project_id IN (" +
                            "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                                "SELECT origin_id FROM BB_PROJECT_TARGET WHERE target_id = :id" +
                            ")" +
                        ")" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(client) {
            return res.json(client[0]);
        });
    },

    getTargetProject: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT WHERE project_id IN (" +
                        "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                            "SELECT origin_id FROM BB_PROJECT_TARGET WHERE target_id = :id" +
                        ")" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(project) {
            return res.json(project[0]);
        });
    },

    getTargetOrigin: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                        "SELECT origin_id FROM BB_PROJECT_TARGET WHERE target_id = :id" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(origins) {
            return res.json(origins[0]);
        });
    },

    getTargetDatacenters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_DATA_CENTER WHERE data_center_code IN (" +
                        "SELECT data_center FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                            "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE target_id = :id" +
                        ")" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(datacenters) {
            return res.json(datacenters);
        });
    },

    getTargetClusters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                        "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE target_id = :id" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(clusters) {
            return res.json(clusters);
        });
    },

    // getTargetServers: function(req, res, next) {
    //     var sql =   "SELECT * FROM BB_ONELINK_SERVER WHERE external_ip IN (" +
    //                     "SELECT external_ip FROM BB_ONELINK_CNAME WHERE onelink_cname IN (" +
    //                         "SELECT target_live_cname FROM BB_PROJECT_TARGET WHERE target_id = :id" +
    //                     ")" +
    //                 ")";

    //     req.sequelize.query(sql, {
    //         replacements: { id: req.params.id },
    //         type: req.sequelize.QueryTypes.SELECT

    //     }).then(function(clusters) {
    //         return res.json(clusters);
    //     });
    // }
};
