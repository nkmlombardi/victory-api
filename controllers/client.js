var Promise = require('bluebird')
var treebuilder = require('../services/treebuilder')

module.exports = {
    getClientAll: async function(request, response, next) {
        var query

        try {
            query = await request.connection.query(`SELECT * FROM BB_CLIENT`)
        } catch(error) {
            return response.json(request.errorHandler(error))
        }

        if (query.length === 0) return request.errorHandler(10000, request, response)

        response.json({
            status: request.status['OK'],
            data: query
        })
    },

    getClient: async function(request, response, next) {
        var query

        try {
            query = await request.connection.query(`SELECT * FROM BB_CLIENT WHERE client_id = ${request.params.id}`)
        } catch(error) {
            return response.json(request.errorHandler(error))
        }

        if (query.length === 0) return request.errorHandler(10000, request, response)

        response.json({
            status: request.status['OK'],
            data: query
        })
    }
}
