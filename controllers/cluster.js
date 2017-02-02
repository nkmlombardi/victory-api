const utility = require('../services/utilities')

module.exports = {
    getClusters: async (request, response) => {
        try {
            response.query = await request.connection.query('SELECT * FROM BB_ONELINK_CLUSTER')
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        return response.json({
            data: response.query
        })
    },

    getCluster: async (request, response) => {
        if (utility.isAlphaNumericDashSlashPlus(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name = '${request.params.id}'`)
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        return response.json({
            data: response.query[0]
        })
    }
}
