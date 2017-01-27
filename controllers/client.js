var utility = require('../services/utilities')

module.exports = {
    getClientAll: async function(request, response, next) {
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_CLIENT`)
        } catch(error) {
            return response.errorHandler(error, request, response, next)
        }

        if (response.query.length === 0) return response.errorHandler(1000, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    },

    getClient: async function(request, response, next) {
        if (utility.isNumber(request.params.id) === false) return response.errorHandler(1001, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_CLIENT WHERE client_id = ${request.params.id}`)
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
