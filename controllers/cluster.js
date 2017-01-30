var utility = require('../services/utilities')

module.exports = {
    getClusters: async function(request, response, next) {
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(4001, request, response)

        return response.json({
            data: response.query
        })
    },

    getCluster: async function(request, response, next) {
        if (utility.isAlphaNumericDashSlashPlus(request.params.id) === false) return response.errorHandler(4002, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name = '${request.params.id}'`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(4001, request, response)
            response.json({
                data: response.query[0]
            })
    }
}
