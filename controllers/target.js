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
        if (utility.isNumber(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_PROJECT_TARGET
                WHERE target_id = ${request.params.id}
            `)
        } catch (error) { return response.handlers.error(error, request, response) }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)
        response.json({ data: transformers.targets.singleton(response.query[0]) })
    },


    /**
     * Find the resource collection
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
     */
    findAll: async (request, response) => {
        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_PROJECT_TARGET
                WHERE is_inactive = 0
                    AND is_hidden = 0
            `)
        } catch (error) { return response.handlers.error(error, request, response) }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)
        response.json({ data: transformers.targets.collection(response.query) })
    }

}
