var Promise = require('bluebird')
var treebuilder = require('../services/treebuilder')

module.exports = {
    getClientAll: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_CLIENT`)
        })
    },

    getClient: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_CLIENT WHERE client_id = ${req.params.id}`)
        })
    }
}
