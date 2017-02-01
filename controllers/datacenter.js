var utility = require('../services/utilities')

module.exports = {
    getDatacenters: async (request, response, next) => {
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_DATA_CENTER WHERE is_active = 1`)
        } catch(error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        response.json({
            data: response.query
        })
    },

    getDatacenter: async (request, response, next) => {
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_DATA_CENTER WHERE data_center_code = '${request.params.id}'`)
        } catch(error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        response.json({
            data: response.query[0]
        })
    },

    getDatacenterClusters: async (request, response, next) => {
        // Pre-database checks
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.handlers.error(4002, request, response)

        // Database query
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER WHERE data_center = '${request.params.id}'`)
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        // Post-database checks
        if (response.query.length === 0) {
            var validateResource = await request.connection.query(`SELECT * FROM BB_DATA_CENTER WHERE data_center_code = '${request.params.id}'`)
            if (validateResource.length === 0) return response.handlers.error(4001, request, response)
            return response.handlers.error(2001, request, response)
        }

        // Endpoint response
        return response.json({
            data: response.query
        })
    }
}
