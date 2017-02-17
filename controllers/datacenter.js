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
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_DATA_CENTER
                WHERE data_center_code = '${request.params.id}'
            `)
        } catch (error) { return response.handlers.error(error, request, response) }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)
        response.json({ data: transformers.datacenters.singleton(response.query[0]) })
    },


    /**
     * Find the resouce collection
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
     */
    findAll: async (request, response) => {
        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_DATA_CENTER
                WHERE is_active = 1
            `)
        } catch (error) { return response.handlers.error(error, request, response) }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)
        response.json({ data: transformers.datacenters.collection(response.query) })
    },


    /**
     * Find all cluster resources that are children of the datacenter resource.
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
     */
    getClusters: async (request, response) => {
        // Pre-database checks
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.handlers.error(4002, request, response)

        // Database query
        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_ONELINK_CLUSTER
                WHERE data_center = '${request.params.id}'
            `)
        } catch (error) { return response.handlers.error(error, request, response) }

        // Post-database checks
        if (response.query.length === 0) {
            const validateResource = await request.connection.query(`
                SELECT *
                FROM BB_DATA_CENTER
                WHERE data_center_code = '${request.params.id}'
            `)

            if (validateResource.length === 0) return response.handlers.error(4001, request, response)
            return response.handlers.error(2001, request, response)
        }

        // Endpoint response
        return response.json({ data: response.query })
    }

}
