module.exports = {
    getServers: function(request, response, next) {
        request.models.server.findAll().then(function(servers) {
            return response.json(servers);
        });
    },

    getServer: function(request, response, next) {
        request.models.server.findById(request.params.id).then(function(servers) {
            return response.json(servers);
        });
    },

    getServerClients: function(request, response, next) {
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

        request.sequelize.query(sql, {
            replacements: { id: request.params.id },
            type: request.sequelize.QueryTypes.SELECT

        }).then(function(clients) {
            return response.json(clients);
        });
    },

    getServerProjects: function(request, response, next) {
        var sql =   "SELECT * FROM BB_PROJECT WHERE project_id IN (" +
                        "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                            "SELECT origin_id FROM BB_PROJECT_TARGET WHERE target_live_cname IN (" +
                                "SELECT onelink_cname FROM BB_ONELINK_CNAME WHERE external_ip IN (" +
                                    "SELECT external_ip FROM BB_ONELINK_SERVER WHERE friendly_hostname = :id" +
                                ")" +
                            ")" +
                        ")" +
                    ")";

        request.sequelize.query(sql, {
            replacements: { id: request.params.id },
            type: request.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return response.json(projects);
        });
    },

    getServerOrigins: function(request, response, next) {
        var sql =   "SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                        "SELECT origin_id FROM BB_PROJECT_TARGET WHERE target_live_cname IN (" +
                            "SELECT onelink_cname FROM BB_ONELINK_CNAME WHERE external_ip IN (" +
                                "SELECT external_ip FROM BB_ONELINK_SERVER WHERE friendly_hostname = :id" +
                            ")" +
                        ")" +
                    ")";

        request.sequelize.query(sql, {
            replacements: { id: request.params.id },
            type: request.sequelize.QueryTypes.SELECT

        }).then(function(origins) {
            return response.json(origins);
        });
    },

    getServerTargets: function(request, response, next) {
        var sql =   "SELECT * FROM BB_PROJECT_TARGET WHERE target_live_cname IN (" +
                        "SELECT onelink_cname FROM BB_ONELINK_CNAME WHERE external_ip IN (" +
                            "SELECT external_ip FROM BB_ONELINK_SERVER WHERE friendly_hostname = :id" +
                        ")" +
                    ")";

        request.sequelize.query(sql, {
            replacements: { id: request.params.id },
            type: request.sequelize.QueryTypes.SELECT

        }).then(function(targets) {
            return response.json(targets);
        });
    },

    getServerDatacenter: function(request, response, next) {
        var sql =   "SELECT * FROM BB_DATA_CENTER WHERE data_center_code IN (" +
                        "SELECT data_center FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                            "SELECT cluster_name FROM BB_ONELINK_SERVER WHERE friendly_hostname = :id" +
                        ")" +
                    ")";

        request.sequelize.query(sql, {
            replacements: { id: request.params.id },
            type: request.sequelize.QueryTypes.SELECT

        }).then(function(datacenters) {
            return response.json(datacenters[0]);
        });
    },

    getServerCluster: function(request, response, next) {
        var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                        "SELECT cluster_name FROM BB_ONELINK_SERVER WHERE friendly_hostname = :id" +
                    ")";

        request.sequelize.query(sql, {
            replacements: { id: request.params.id },
            type: request.sequelize.QueryTypes.SELECT

        }).then(function(clusters) {
            return response.json(clusters[0]);
        });
    }
};
