var transformers = require('../services/transformers')
var handlers = require('../services/handlers')
var utility = require('../services/utilities')

module.exports = {

    /**
     * Find singleton in the resource collection
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} singleton
     */
    find: async (request, response) => {
        if (utility.isNumber(request.params.id) === false) {
            handlers.error(4002, (status, payload) => response.status(status).json(payload))
        }

        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_PROJECT_ORIGIN
                WHERE origin_id = ${request.params.id}
            `)
        } catch (error) {
            handlers.error(error, (status, payload) => response.status(status).json(payload))
        }

        if (response.query.length === 0) {
            handlers.error(4001, (status, payload) => response.status(status).json(payload))
        }

        response.json({
            data: transformers.origins.singleton(response.query[0])
        })
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
                SELECT
                    origin.*,
                    client.notification_level
                FROM
                    BB_CLIENT           AS client,
                    BB_PROJECT          AS project,
                    BB_PROJECT_ORIGIN   AS origin
                WHERE origin.project_id = project.project_id
                    AND client.client_id = project.client_id
                    AND origin.is_inactive = 0
                    AND origin.is_hidden = 0
            `)
        } catch (error) { return request.handlers.error(error, request, response) }

        if (response.query.length === 0) return request.handlers.error(4001, request, response)
        response.json({ data: transformers.origins.collection(response.query) })
    },


    /**
     * Find all target resources that are children of the origin resource.
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
     */
    getTargets: async (request, response) => {
        if (utility.isNumber(request.params.id) === false) return handlers.error(4002, (status, error) => response.status(status).json(error))

        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_PROJECT_TARGET
                WHERE origin_id = ${request.params.id}
                    AND is_inactive = 0
                    AND is_hidden = 0
            `)
        } catch (error) { return request.handlers.error(error, request, response) }

        if (response.query.length === 0) return request.handlers.error(4001, request, response)
        return response.json({ data: transformers.targets.collection(response.query) })
    },


    /**
     * Find all of an origin's health history entries
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
     */
    getHealthHistory: async (request, response) => {
        if (utility.isNumber(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_PROJECT_ORIGIN_HEALTH_LOG
                WHERE origin_id = ${request.params.id}
                    AND health_dtm BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
                ORDER BY health_dtm DESC
            `)
        } catch (error) { return request.handlers.error(error, request, response) }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)
        return response.json({ data: transformers.origins.health(response.query) })
    },


    /**
     * Find all of an origin's dispatch history entries
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
     */
    getDispatchHistory: async (request, response) => {
        if (utility.isNumber(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM NOC_EVENT_DISPATCH
                WHERE noc_dispatch_object = 'BB_PROJECT_ORIGIN_HEALTH'
                    AND noc_dispatch_object_id = ${request.params.id}
                ORDER BY noc_dispatch_start_dtm DESC
                LIMIT 10
            `)
        } catch (error) { return request.handlers.error(error, request, response) }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)
        return response.json({ data: transformers.origins.dispatch(response.query) })
    }

}
