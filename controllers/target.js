var utility = require('../services/utilities')

module.exports = {
    getTargets: async function(request, response, next) {
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_PROJECT_TARGET WHERE is_inactive = 0 AND is_hidden = 0`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return request.errorHandler(4001, request, response)

        response.json({
            data: response.query
        })
    },

    getTarget: async function(request, response, next) {
        if (utility.isNumber(request.params.id) === false) return response.errorHandler(4002, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_PROJECT_TARGET WHERE target_id = ${request.params.id}`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(4001, request, response)

        response.json({
            data: response.query[0]
        })
    }
}
