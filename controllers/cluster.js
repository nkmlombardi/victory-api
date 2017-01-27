var utility = require('../services/utilities')

module.exports = {
    getClusters: async function(request, response, next) {
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER`)
        } catch(error) {
            return response.errorHandler(error, request, response, next)
        }

        if (response.query.length === 0) return response.errorHandler(10000, request, response)

        return response.json({
            status: request.status['OK'],
            data: response.query
        })
    },

    getCluster: async function(request, response, next) {
        if (utility.isAlphaNumericSpecial(request.params.id) === false) return response.errorHandler(1001, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name = '${request.params.id}'`)
        } catch(error) {
            return response.errorHandler(error, request, response, next)
        }

        if (response.query.length === 0) return response.errorHandler(1000, request, response)
            response.json({
                status: request.status['OK'],
                data: response.query
            })
    }
}
