// var promise = require('promise');

var treebuilder = require('../lib/treebuilder.sync');
var treebuilder2 = require('../lib/treebuilder.async');
var treebuilder3 = require('../lib/treebuilder.twostep');

/*
    This resource does not include an endpoint to retrieve the Client's relation
    to Servers as there is no way to determine which Servers a Client exists on
    within a group of servers behind a load balancer, AKA a Cluster.
 */

module.exports = {
    getClients: function(req, res, next) {
        console.log(req.connection);
        req.connection.query("SELECT * FROM BB_CLIENT")
            .then(function(data) {
                return res.json(data);
            });
    },

    getClientsTree: function(req, res, next) {
        var sql =   'SELECT C.client_id, P.project_id, O.origin_id, T.target_id ' +
                    'FROM BB_CLIENT C, BB_PROJECT P, BB_PROJECT_ORIGIN O, BB_PROJECT_TARGET T ' +
                    'WHERE C.client_id = P.client_id ' +
                        'AND P.project_id = O.project_id ' +
                        'AND O.origin_id = T.origin_id ' +
                    'ORDER BY 1, 2, 3, 4;';

        console.time('relationsQuery');
        req.db.sequelize.query(sql, { type: req.db.sequelize.QueryTypes.SELECT })
            .then(function(data) {
                console.timeEnd('relationsQuery');

                console.time('buildRelations');
                var results = treebuilder3.buildRelations(data);
                console.timeEnd('buildRelations');

                return results;
            })
            .then(function(relationalTree) {
                console.time('Promises');
                Promise.all([
                    req.connection.execute("SELECT * FROM BB_CLIENT"),
                    req.connection.execute("SELECT * FROM BB_PROJECT"),
                    req.connection.execute("SELECT * FROM BB_PROJECT_ORIGIN"),
                    req.connection.execute("SELECT * FROM BB_PROJECT_TARGET"),

                ]).then(function(data) {
                    console.timeEnd('Promises');
                    var datasets = {
                        clients:    data[0],
                        projects:   data[1],
                        origins:    data[2],
                        targets:    data[3]
                    };

                    return res.json(datasets);

                    // console.time('linkRelations');
                    // var results = treebuilder3.linkRelations(relationalTree, datasets);
                    // console.timeEnd('linkRelations');

                    // return res.json(results);
                });
            });
    },


    getClientsTree2: function(req, res, next) {
        var sql =   'SELECT C.client_id, P.project_id, O.origin_id, T.target_id ' +
                    'FROM BB_CLIENT C, BB_PROJECT P, BB_PROJECT_ORIGIN O, BB_PROJECT_TARGET T ' +
                    'WHERE C.client_id = P.client_id ' +
                        'AND P.project_id = O.project_id ' +
                        'AND O.origin_id = T.origin_id ' +
                    'ORDER BY 1, 2, 3, 4;';

        console.time('resolvePromises');
        Promise.all([
            req.db.sequelize.query(sql,                                 { type: req.db.sequelize.QueryTypes.SELECT }),
            req.db.sequelize.query('SELECT * FROM BB_CLIENT',           { type: req.db.sequelize.QueryTypes.SELECT }),
            req.db.sequelize.query('SELECT * FROM BB_PROJECT',          { type: req.db.sequelize.QueryTypes.SELECT }),
            req.db.sequelize.query('SELECT * FROM BB_PROJECT_ORIGIN',   { type: req.db.sequelize.QueryTypes.SELECT }),
            req.db.sequelize.query('SELECT * FROM BB_PROJECT_TARGET',   { type: req.db.sequelize.QueryTypes.SELECT })

        ]).then(function(data) {
            console.timeEnd('resolvePromises');

            var relations = data[0];
            var datasets = {
                clients:    data[1],
                projects:   data[2],
                origins:    data[3],
                targets:    data[4]
            };

            // 1443, 1438, 1260, 1386, 1387, 1303 [340 - 403][488 - 689]
            // console.time('buildRelations');
            // var relationalTree = treebuilder.buildRelations(relations, datasets);
            // console.timeEnd('buildRelations');

            // 1306, 1602, 1431, 1680, 1451, 1424 [308 - 335][502 - 755]
            // console.time('buildRelationsAsync');
            // var relationalTreeAsync = treebuilder2.buildRelations(relations, datasets);
            // console.timeEnd('buildRelationsAsync');

            // 1458, 1450, 1228, 1620, 1441, 1302 [340 - 369][500 - 685]
            console.time('buildRelationsTwoStep');
            var relationalTreeTwoStep = treebuilder3.buildRelations(relations);
            var linkedRelationalTree = treebuilder3.linkRelations(relationalTreeTwoStep, datasets);
            console.timeEnd('buildRelationsTwoStep');

            // setTimeout(function() {
            //     return res.json(relationalTreeAsync);
            // });

            res.json(linkedRelationalTree);
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
