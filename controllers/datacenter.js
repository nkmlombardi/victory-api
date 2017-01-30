var utility = require('../services/utilities')

module.exports = {
    getDatacenters: async function(request, response, next) {
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_DATA_CENTER`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(1000, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    },

    getDatacenter: async function(request, response, next) {
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.errorHandler(1001, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_DATA_CENTER WHERE data_center_code = '${request.params.id}'`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(1000, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    },

    getDatacenterClients: async function(request, response, next) {
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.errorHandler(1001, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_CLIENT WHERE client_id IN (` +
                            `SELECT client_id FROM BB_PROJECT WHERE project_id IN (` +
                                `SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (` +
                                    `SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name IN (` +
                                        `SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = '${request.params.id}'` +
                                    `)` +
                                `)` +
                            `)` +
                        `)`
                    )
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(1002, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    },

    getDatacenterProjects: async function(request, response, next) {
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.errorHandler(1001, request, response)

        try {
            response.query = await request.connection.query( `SELECT * FROM BB_PROJECT WHERE project_id IN (` +
                            `SELECT project_id FROM BB_PROJECT_ORIGIN WHERE origin_id IN (` +
                                `SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name IN (` +
                                    `SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = '${request.params.id}'` +
                                `)` +
                            `)` +
                        `)`
                    )
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(1002, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    },

    getDatacenterOrigins: async function(request, response, next) {
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.errorHandler(1001, request, response)

        try {
            response.query = await request.connection.query( `SELECT * FROM BB_PROJECT_ORIGIN WHERE origin_id IN (` +
                            `SELECT origin_id FROM BB_PROJECT_TARGET WHERE cluster_name IN (` +
                                `SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = '${request.params.id}'` +
                            `)` +
                        `)`
                    )
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(1002, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    },

    getDatacenterTargets: async function(request, response, next) {
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.errorHandler(1001, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_PROJECT_TARGET WHERE cluster_name IN (` +
                            `SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = '${request.params.id}'` +
                        `)`
                    )
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(1002, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    },

    getDatacenterServers: async function(request, response, next) {
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.errorHandler(1001, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_SERVER WHERE cluster_name IN (` +
                            `SELECT cluster_name FROM BB_ONELINK_CLUSTER WHERE data_center = '${request.params.id}'` +
                        `)`
                    )
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(1002, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    },

    getDatacenterClusters: async function(request, response, next) {
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.errorHandler(1001, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER WHERE data_center = '${request.params.id}'`)
        } catch(error) {
            return response.errorHandler(error, request, response)
        }

        if (response.query.length === 0) return response.errorHandler(1002, request, response)

        response.json({
            status: request.status['OK'],
            data: response.query
        })
    }
}
