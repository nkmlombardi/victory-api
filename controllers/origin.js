module.exports = {
    getOriginAll: async function(request, response, next) {
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_PROJECT_ORIGIN`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return request.errorHandler(4001, request, response)

        response.json({
            data: response.query
        })
    },


    getOrigin: async function(request, response, next) {
        if (utility.isNumber(request.params.id) === false) return response.errorHandler(4002, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id = ${request.params.id}`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return request.errorHandler(4001, request, response)

        response.json({
            data: response.query[0]
        })
    },



    getOriginTargets: async function(request, response, next) {
        if (utility.isNumber(request.params.id) === false) return response.errorHandler(4002, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_PROJECT_TARGET WHERE origin_id = ${request.params.id}`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return request.errorHandler(4001, request, response)

        response.json({
            data: response.query
        })
    },

    getOriginHealth: async function(request, response, next) {
        if (utility.isNumber(request.params.id) === false) return response.errorHandler(4002, request, response)

        try {
            response.query = await request.connection.query(
                `SELECT ` +
                `origin_id                  AS id, ` +
                `statistic_health_score     AS health, ` +
                `health_dtm                 AS timestamp ` +
            `FROM       BB_PROJECT_ORIGIN_HEALTH ` +
            `WHERE      origin_id = ${request.params.id} ` +
            `ORDER BY   health_dtm DESC`
            )
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return request.errorHandler(4001, request, response)

        response.json({
            data: response.query
        })
    },

    getOriginAllHealth: async function(request, response, next) {
        try {
            response.query = await request.connection.query(
                `SELECT DISTINCT origin_id, AVG(statistic_health_score) AS health_percent, MAX(health_dtm) as health_dtm ` +
                `FROM BB_PROJECT_ORIGIN_HEALTH ` +
                `GROUP BY origin_id`
            )
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return request.errorHandler(4001, request, response)

        response.json({
            data: response.query
        })
    },
}
