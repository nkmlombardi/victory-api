var helpers = require('./_helpers');

module.exports = {
    getClients: function(req, res, next) {
        var sql = "SELECT * FROM BB_CLIENT";

        req.db.query(sql, function(err, rows, fields) {
            if (err) return res.status(500).send(err);

            return res.json(rows);
        });
    },

    getClient: function(req, res, next) {
        var sql = "SELECT * FROM BB_CLIENT WHERE client_id = " + req.params.id;

        req.db.query(sql, function(err, rows, fields) {
            if (err) return res.status(500).send(err);

            return res.json(rows);
        });
    },

    getClientProjects: function(req, res, next) {
        var sql = "SELECT * FROM BB_PROJECT WHERE client_id = " + req.params.id;

        req.db.query(sql, function(err, rows, fields) {
            if (err) return res.status(500).send(err);

            return res.json(rows);
        });
    },

    getClientOrigins: function(req, res, next) {
        var sql = "SELECT * FROM BB_PROJECT_ORIGIN WHERE project_id IN (SELECT project_id FROM BB_PROJECT WHERE client_id = " + req.params.id + ")";

        req.db.query(sql, function(err, rows, fields) {
            if (err) return res.status(500).send(err);

            return res.json(rows);
        });
    },

    getClientTargets: function(req, res, next) {
        var sql =   "SELECT * FROM BB_PROJECT_TARGET WHERE origin_id IN (" +
                        "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id IN (" +
                            "SELECT project_id FROM BB_PROJECT WHERE client_id = " + req.params.id +
                        ")" +
                    ")";

        req.db.query(sql, function(err, rows, fields) {
            if (err) return res.status(500).send(err);

            return res.json(rows);
        });
    },

    getClientClusters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                        "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id IN (" +
                            "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id IN (" +
                                "SELECT project_id FROM BB_PROJECT WHERE client_id = " + req.params.id +
                            ")" +
                        ")" +
                    ")";

        req.db.query(sql, function(err, rows, fields) {
            if (err) return res.status(500).send(err);

            return res.json(rows);
        });
    },

    // getClientServers: function(req, res, next) {
    //     res.send(200);
    // }

    getClientDatacenters: function(req, res, next) {
        var sql =   "SELECT * FROM BB_DATA_CENTER WHERE data_center_code IN (" +
                        "SELECT data_center FROM BB_ONELINK_CLUSTER WHERE cluster_name IN (" +
                            "SELECT cluster_name FROM BB_PROJECT_TARGET WHERE origin_id IN (" +
                                "SELECT origin_id FROM BB_PROJECT_ORIGIN WHERE project_id IN (" +
                                    "SELECT project_id FROM BB_PROJECT WHERE client_id = " + req.params.id +
                                ")" +
                            ")" +
                        ")" +
                    ")";

        req.db.query(sql, function(err, rows, fields) {
            if (err) return res.status(500).send(err);

            return res.json(rows);
        });
    },

};
