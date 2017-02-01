var utility = require('../services/utilities')

module.exports = {
    getClients: async function(request, response, next) {
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_CLIENT WHERE is_inactive = 0 AND is_hidden = 0`)
        } catch(error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        response.json({
            data: response.query
        })
    },

    getClient: async function(request, response, next) {
        if (utility.isNumber(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_CLIENT WHERE client_id = ${request.params.id}`)
        } catch(error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        response.json({
            data: response.query[0]
        })
    },

    getClientOrigins: async function (request, response, next) {
        try {
            response.query = await request.connection.query(`
                SELECT  *
                FROM    BB_PROJECT_ORIGIN
                WHERE   project_id  IN (
                    SELECT  project_id
                    FROM    BB_PROJECT
                    WHERE   client_id = '${request.params.id}'
                        AND is_inactive = 0
                        AND is_hidden = 0
                )
            `)
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        response.json({
            data: response.query
        })
    },
}
