module.exports = {
    getOriginAll: async function(request, response, next) {
        return response.json({
            status: request.status.success,
            data: await request.connection.query(`SELECT * FROM BB_PROJECT_ORIGIN`)
        })
    },

    getOrigin: async function(request, response, next) {
        return response.json({
            status: request.status.success,
            data: await request.connection.query(`SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id = ${request.params.id}`)
        })
    },

    getOriginTargets: async function(request, response, next) {
        return response.json({
            status: request.status.success,
            data: await request.connection.query(`SELECT * FROM BB_PROJECT_TARGET WHERE origin_id = ${request.params.id}`)
        })
    },

    getOriginHealth: async function(request, response, next) {
        return response.json({
            status: request.status.success,
            data: await request.connection.query(
                `SELECT ` +
                    `origin_id                  AS id, ` +
                    `statistic_health_score     AS health, ` +
                    `health_dtm                 AS timestamp ` +
                `FROM       BB_PROJECT_ORIGIN_HEALTH ` +
                `WHERE      origin_id = ${request.params.id} ` +
                `ORDER BY   health_dtm DESC`
            )
        })
    },

    getOriginAllHealth: async function(request, response, next) {
        return response.json({
            status: request.status.success,
            data: await request.connection.query(
                `SELECT DISTINCT origin_id, AVG(statistic_health_score) AS health_percent, MAX(health_dtm) as health_dtm ` +
                `FROM BB_PROJECT_ORIGIN_HEALTH ` +
                `GROUP BY origin_id`
            )
        })
    }
}
