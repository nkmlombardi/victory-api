// var promise = require('promise');

var treebuilder = require('../lib/treebuilder.twostep');

/*
    This resource does not include an endpoint to retrieve the Client's relation
    to Servers as there is no way to determine which Servers a Client exists on
    within a group of servers behind a load balancer, AKA a Cluster.
 */

module.exports = {
    getClients: function(req, res, next) {
        req.models.client.findAll().then(function(clients) {
            return res.json(clients);
        });
    },

    getClientsTree: function(req, res, next) {
        var sql =   'SELECT C.client_id, P.project_id, O.origin_id, T.target_id ' +
                    'FROM BB_CLIENT C, BB_PROJECT P, BB_PROJECT_ORIGIN O, BB_PROJECT_TARGET T ' +
                    'WHERE C.client_id = P.client_id ' +
                        'AND P.project_id = O.project_id ' +
                        'AND O.origin_id = T.origin_id ' +
                    'ORDER BY 1, 2, 3, 4;';

        Promise.all([
            req.db.sequelize.query(sql,                                 { type: req.db.sequelize.QueryTypes.SELECT }),
            req.db.sequelize.query('SELECT * FROM BB_CLIENT',           { type: req.db.sequelize.QueryTypes.SELECT }),
            req.db.sequelize.query('SELECT * FROM BB_PROJECT',          { type: req.db.sequelize.QueryTypes.SELECT }),
            req.db.sequelize.query('SELECT * FROM BB_PROJECT_ORIGIN',   { type: req.db.sequelize.QueryTypes.SELECT }),
            req.db.sequelize.query('SELECT * FROM BB_PROJECT_TARGET',   { type: req.db.sequelize.QueryTypes.SELECT })

        ]).then(function(data) {
            console.log('All promises resolved.');

            var relations = data[0];
            var datasets = {
                clients:    data[1],
                projects:   data[2],
                origins:    data[3],
                targets:    data[4]
            };

            // console.log(data[1]);

            // var relationalTree = treebuilder.buildRelations(relations);
            // var linkedTree = treebuilder.linkRelations(relationalTree, datasets);


            console.time('buildTree');
            var relationalTree = treebuilder.buildRelations(relations);
            console.timeEnd('buildTree');

            console.time('populateTree');
            var linkedTree = treebuilder.linkRelations(relationalTree, datasets);
            console.timeEnd('populateTree');

            return res.json(linkedTree);
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
