const utility = require('../services/utilities')

module.exports = {
    getOrigins: async (request, response) => {
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
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        return response.json({
            data: response.query
        })
    },

    getOrigin: async (request, response) => {
        if (utility.isNumber(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_PROJECT_ORIGIN
                WHERE origin_id = ${request.params.id}
            `)
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        return response.json({
            data: response.query[0]
        })
    },

    getOriginTargets: async (request, response) => {
        if (utility.isNumber(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_PROJECT_TARGET
                WHERE origin_id = ${request.params.id}
                    AND is_inactive = 0
                    AND is_hidden = 0
            `)
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return request.handlers.error(4001, request, response)

        return response.json({
            data: response.query
        })
    },

    getOriginHealthLog: async (request, response) => {
        if (utility.isNumber(request.params.id) === false) return response.errorHandler(4002, request, response)

        try {
            response.query = await request.connection.query(`
                SELECT *
                FROM BB_PROJECT_ORIGIN_HEALTH_LOG
                WHERE origin_id = ${request.params.id}
                ORDER BY health_dtm DESC
                LIMIT 25
            `)
        } catch (error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(4001, request, response)

        return response.json({
            data: response.query
        })
    }
}
