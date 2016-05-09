module.exports = {
    getDatacenters: function(req, res, next) {
        req.models.datacenter.findAll().then(function(datacenters) {
            return res.json(datacenters);
        });
    },

    getDatacenter: function(req, res, next) {
        req.models.datacenter.findById(req.params.id).then(function(datacenter) {
            return res.json(datacenter);
        });
    },

    getDatacenterClients: function(req, res, next) {
        var sql =   "SELECT * FROM BB_CLIENT WHERE client_id IN (" +
                        "SELECT client_id FROM BB_PROJECT WHERE project_id IN (" +
                            "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                                "SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name IN (" +
                                    "SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = :id" +
                                ")" +
                            ")" +
                        ")" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(datacenters) {
            return res.json(datacenters);
        });
    },

    getDatacenterProjects: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT WHERE project_id IN (" +
                        "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                            "SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name IN (" +
                                "SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = :id" +
                            ")" +
                        ")" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(datacenters) {
            return res.json(datacenters);
        });
    },

    getDatacenterOrigins: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                        "SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name IN (" +
                            "SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = :id" +
                        ")" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(datacenters) {
            return res.json(datacenters);
        });
    },

    getDatacenterTargets: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_TARGET WHERE cluster_name IN (" +
                        "SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = :id" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(datacenters) {
            return res.json(datacenters);
        });
    },

    getDatacenterServers: function(req, res, next) {
        var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE data_center = :id";

        var sql =   "SELECT * FROM BB_PROJECT_SERVER WHERE cluster_name IN (" +
                        "SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = :id" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(servers) {
            return res.json(servers);
        });
    },

    getDatacenterClusters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE data_center = :id";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(clusters) {
            return res.json(clusters);
        });
    }
};
