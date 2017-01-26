module.exports = {
    getClusters: async function(request, response, next) {
        var query

        try {
            query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER`)
        } catch(error) {
            return response.json(request.errorHandler(error))
        }

        if (query.length === 0) return request.errorHandler(10000, request, response)

        return response.json({
            status: request.status['OK'],
            data: query
        })
    },

    getCluster: async function(request, response, next) {
        var query

        try {
            query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name = '${request.params.id}'`)
        } catch(error) {
            return response.json(request.errorHandler(error))
        }

        if (query.length === 0) return request.errorHandler(10000, request, response)
            response.json({
                status: request.status['OK'],
                data: query
            })
    }
}
