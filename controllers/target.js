module.exports = {
    getTargets: async function(request, response, next) {
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_PROJECT_TARGET`)
        } catch(error) {
            return response.errorHandler(error, request, response, next)
        }

        if (response.query.length === 0) return request.errorHandler(1000, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    },

    getTarget: async function(request, response, next) {
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_PROJECT_TARGET WHERE target_id = ${request.params.id}`)
        } catch(error) {
            return response.errorHandler(error, request, response, next)
        }

        if (response.query.length === 0) return request.errorHandler(1000, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    }
}
