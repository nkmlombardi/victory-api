var treebuilder = require('../services/treebuilder');
var Promise = require("bluebird");

module.exports = {
    getClusters: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER`)
        })
    },

    getCluster: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_id = ${req.params.id}`)
        })
    }
}
