<<<<<<< HEAD
var utility = require('../services/utilities')
var transformers = require('../services/transformers')
=======
const utility = require('../services/utilities')
>>>>>>> 631441fbc108703295b0a31f66fa9d96d400b132

module.exports = {
    getClients: async (request, response) => {
        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_CLIENT
                WHERE is_inactive = 0
                    AND is_hidden = 0
            `)
        } catch (error) { return response.handlers.error(error, request, response) }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

<<<<<<< HEAD
        response.json({ data: transformers.clients.collection(response.query) })
=======
        return response.json({
            data: response.query
        })
>>>>>>> 631441fbc108703295b0a31f66fa9d96d400b132
    },

    getClient: async (request, response) => {
        if (utility.isNumber(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_CLIENT
                WHERE client_id = ${request.params.id}
            `)
        } catch (error) { return response.handlers.error(error, request, response) }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

<<<<<<< HEAD
        response.json({ data: transformers.clients.singleton(response.query[0]) })
=======
        return response.json({
            data: response.query[0]
        })
>>>>>>> 631441fbc108703295b0a31f66fa9d96d400b132
    },

    getClientOrigins: async (request, response) => {
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

        return response.json({
            data: response.query
        })
    }
}
