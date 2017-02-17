var utility = require('../services/utilities')
var transformers = require('../services/transformers')

module.exports = {
    getClusters: async (request, response, next) => {
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER`)
        } catch(error) { return response.handlers.error(error, request, response) }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        return response.json({ data: transformers.clusters.collection(response.query) })
    },

    getCluster: async (request, response, next) => {
        if (utility.isAlphaNumericDashSlashPlus(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name = '${request.params.id}'`)
        } catch(error) { return response.handlers.error(error, request, response) }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        response.json({ data: transformers.clusters.singleton(response.query[0]) })
    }
}
