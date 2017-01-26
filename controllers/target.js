module.exports = {
    getTargets: async function(request, response, next) {
        return response.json({
            status: request.status.success,
            data: await request.connection.query(`SELECT * FROM BB_PROJECT_TARGET`)
        })
    },

    getTarget: async function(request, response, next) {
        return response.json({
            status: request.status.success,
            data: await request.connection.query(`SELECT * FROM BB_PROJECT_TARGET WHERE target_id = ${request.params.id}`)
        })
    }
}
