var utility = require('../services/utilities')
var transformers = require('../services/transformers')

module.exports = {

    /**
     * Find singleton in the resource collection
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} singleton
     */
    find: async (request, response) => {
        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_CLIENT
                WHERE is_inactive = 0
                    AND is_hidden = 0
            `)
        } catch (error) { return request.handlers.error(error, request, response) }

        if (response.query.length === 0) return request.handlers.error(4001, request, response)
        response.json({ data: transformers.clients.collection(response.query) })
    },


    /**
     * Find the resource collection
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
     */
    findAll: async (request, response) => {
        if (utility.isNumber(request.params.id) === false) return request.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_CLIENT
                WHERE client_id = ${request.params.id}
            `)
        } catch (error) { return request.handlers.error(error, request, response) }

        if (response.query.length === 0) return request.handlers.error(4001, request, response)
        response.json({ data: transformers.clients.singleton(response.query[0]) })
    },


    /**
     * Find all origin resources that are children of the client resource.
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
     */
    getOrigins: async (request, response) => {
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
        } catch (error) { return request.handlers.error(error, request, response) }

        if (response.query.length === 0) return request.handlers.error(4001, request, response)
        return response.json({ data: transformers.origins.collection(response.query) })
    }

}
