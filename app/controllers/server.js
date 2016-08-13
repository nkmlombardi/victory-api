module.exports = {
    getServers: function(req, res, next) {
        req.models.server.findAll().then(function(servers) {
            return res.json(servers);
        });
    },

    getServer: function(req, res, next) {
        req.models.server.findById(req.params.id).then(function(servers) {
            return res.json(servers);
        });
    },

    getServerClients: function(req, res, next) {
        var sql =   "SELECT * FROM BB_CLIENT WHERE client_id IN (" +
                        "SELECT client_id FROM BB_PROJECT WHERE project_id IN (" +
                            "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                                "SELECT origin_id FROM BB_PROJECT_TARGET WHERE target_live_cname IN (" +
                                    "SELECT onelink_cname FROM BB_ONELINK_CNAME WHERE external_ip IN (" +
                                        "SELECT external_ip FROM BB_ONELINK_SERVER WHERE friendly_hostname = :id" +
                                    ")" +
                                ")" +
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

    getServerProjects: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT WHERE project_id IN (" +
                        "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                            "SELECT origin_id FROM BB_PROJECT_TARGET WHERE target_live_cname IN (" +
                                "SELECT onelink_cname FROM BB_ONELINK_CNAME WHERE external_ip IN (" +
                                    "SELECT external_ip FROM BB_ONELINK_SERVER WHERE friendly_hostname = :id" +
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
    },

    getServerOrigins: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                        "SELECT origin_id FROM BB_PROJECT_TARGET WHERE target_live_cname IN (" +
                            "SELECT onelink_cname FROM BB_ONELINK_CNAME WHERE external_ip IN (" +
                                "SELECT external_ip FROM BB_ONELINK_SERVER WHERE friendly_hostname = :id" +
                            ")" +
                        ")" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(origins) {
            return res.json(origins);
        });
    },

    getServerTargets: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_TARGET WHERE target_live_cname IN (" +
                        "SELECT onelink_cname FROM BB_ONELINK_CNAME WHERE external_ip IN (" +
                            "SELECT external_ip FROM BB_ONELINK_SERVER WHERE friendly_hostname = :id" +
                        ")" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(targets) {
            return res.json(targets);
        });
    },

    getServerDatacenter: function(req, res, next) {
        var sql =   "SELECT * FROM BB_DATA_CENTER WHERE data_center_code IN (" +
                        "SELECT data_center FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                            "SELECT cluster_name FROM BB_ONELINK_SERVER WHERE friendly_hostname = :id" +
                        ")" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(datacenters) {
            return res.json(datacenters[0]);
        });
    },

    getServerCluster: function(req, res, next) {
        var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                        "SELECT cluster_name FROM BB_ONELINK_SERVER WHERE friendly_hostname = :id" +
                    ")";

        req.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.sequelize.QueryTypes.SELECT

        }).then(function(clusters) {
            return res.json(clusters[0]);
        });
    }
};
