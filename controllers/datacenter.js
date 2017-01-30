var utility = require('../services/utilities')

module.exports = {
    getDatacenters: async function(request, response, next) {
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_DATA_CENTER`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(1000, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    },

    getDatacenter: async function(request, response, next) {
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.errorHandler(1001, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_DATA_CENTER WHERE data_center_code = '${request.params.id}'`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(1000, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    },

    getDatacenterClusters: async function(request, response, next) {
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.errorHandler(1001, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER WHERE data_center_code = '${request.params.id}'`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(1000, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    }
}
