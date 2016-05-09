/*
    This resource does not include an endpoint to retrieve the Client's relation
    to Servers as there is no way to determine which Servers a Client exists on
    within a group of servers behind a load balancer, AKA a Cluster.
 */

module.exports = {
    getClients: function(req, res, next) {
        console.log(req.models);

        req.models.client.findAll().then(function(clients) {
            return res.json(clients);
        });
    },

    getClient: function(req, res, next) {
        req.models.client.findById(req.params.id).then(function(clients) {
            return res.json(clients);
        });
    },

    getClientProjects: function(req, res, next) {
        var sql = "SELECT * FROM BB_PROJECT WHERE client_id = :id";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
        });
    },

    getClientOrigins: function(req, res, next) {
        var sql = "SELECT * FROM BB_PROJECT_ORIGIN WHERE project_id IN (SELECT project_id FROM BB_PROJECT WHERE client_id = :id)";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
        });
    },

    getClientTargets: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_TARGET WHERE origin_id IN (" +
                        "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id IN (" +
                            "SELECT project_id FROM BB_PROJECT WHERE client_id = :id" +
                        ")" +
                    ")";

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
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

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
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

        req.db.sequelize.query(sql, {
            replacements: { id: req.params.id },
            type: req.db.sequelize.QueryTypes.SELECT

        }).then(function(projects) {
            return res.json(projects);
        });
    }
};
