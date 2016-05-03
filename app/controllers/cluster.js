module.exports = {
    getClusters: function(req, res, next) {
        req.models.cluster.findAll().then(function(clusters) {
            return res.json(clusters);
        });
    },

    getCluster: function(req, res, next) {
        req.models.cluster.findById(req.params.id).then(function(clusters) {
            return res.json(clusters);
        });
    },

    getClusterClients: function(req, res, next) {
        var sql =   "SELECT * FROM BB_CLIENT WHERE client_id IN (" +
                        "SELECT client_id FROM BB_PROJECT WHERE project_id IN (" +
                            "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                                "SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name = :id" +
                            ")" +
                        ")" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(clients) {
            return res.json(clients);
        });
    },

    getClusterProjects: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT WHERE project_id IN (" +
                        "SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                            "SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name = :id" +
                        ")" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(project) {
            return res.json(project);
        });
    },

    getClusterOrigins: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id IN (" +
                        "SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name = :id" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(origins) {
            return res.json(origins);
        });
    },

    getClusterTargets: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_TARGET WHERE cluster_name = :id";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(clusters) {
            return res.json(clusters);
        });
    },

    getClusterDatacenter: function(req, res, next) {
        var sql =   "SELECT * FROM BB_DATA_CENTER WHERE data_center_code IN (" +
                        "SELECT data_center FROM BB_ONELINK_CLUSTER WHERE cluster_name = :id" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(datacenters) {
            return res.json(datacenters[0]);
        });
    }
};
