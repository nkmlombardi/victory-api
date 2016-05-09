module.exports = {
    getOrigins: function(req, res, next) {
        req.models.origin.findAll().then(function(origins) {
            return res.json(origins);
        });
    },

    getOrigin: function(req, res, next) {
        req.models.origin.findById(req.params.id).then(function(origin) {
            return res.json(origin);
        });
    },

    getOriginClient: function(req, res, next) {
        var sql =   "SELECT * FROM BB_CLIENT WHERE client_id IN (" +
                        "SELECT client_id FROM BB_PROJECT WHERE project_id IN (" +
                            "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id = :id" +
                        ")" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(client) {
            return res.json(client[0]);
        });
    },

    getOriginProject: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT WHERE project_id IN (" +
                        "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id = :id" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(project) {
            return res.json(project[0]);
        });
    },

    getOriginTargets: function(req, res, next) {
        var sql = "SELECT * FROM BB_PROJECT_TARGET WHERE origin_id = :id";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(targets) {
            return res.json(targets);
        });
    },

    getOriginServers: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_SERVER WHERE external_ip IN (" +
                        "SELECT external_ip FROM BB_ONELINK_CNAME WHERE onelink_cname IN (" +
                            "SELECT target_live_cname FROM BB_ONELINK_TARGET WHERE origin_id = :id" +
                        ")" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(servers) {
            return res.json(servers);
        });
    },

    getOriginClusters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                        "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id = :id" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(clusters) {
            return res.json(clusters);
        });
    },

    getOriginDatacenters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_DATA_CENTER WHERE data_center_code IN (" +
                        "SELECT data_center FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                            "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id = :id" +
                        ")" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(datacenters) {
            return res.json(datacenters);
        });
    }
};
