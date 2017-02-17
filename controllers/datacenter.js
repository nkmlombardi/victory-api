<<<<<<< HEAD
var utility = require('../services/utilities')
var transformers = require('../services/transformers')
=======
const utility = require('../services/utilities')
>>>>>>> 631441fbc108703295b0a31f66fa9d96d400b132

module.exports = {
    getDatacenters: async (request, response) => {
        try {
            response.query = await request.connection.query('SELECT * FROM BB_DATA_CENTER WHERE is_active = 1')
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

<<<<<<< HEAD
        response.json({
            data: transformers.datacenters.collection(response.query)
            // data: response.query
=======
        return response.json({
            data: response.query
>>>>>>> 631441fbc108703295b0a31f66fa9d96d400b132
        })
    },

    getDatacenter: async (request, response) => {
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_DATA_CENTER WHERE data_center_code = '${request.params.id}'`)
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

<<<<<<< HEAD
        response.json({
            data: transformers.datacenters.singleton(response.query[0])
=======
        return response.json({
            data: response.query[0]
>>>>>>> 631441fbc108703295b0a31f66fa9d96d400b132
        })
    },

    getDatacenterClusters: async (request, response) => {
        // Pre-database checks
        if (utility.isUppercaseDashColon(request.params.id) === false) return response.handlers.error(4002, request, response)

        // Database query
        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER WHERE data_center = '${request.params.id}'`)
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        // Post-database checks
        if (response.query.length === 0) {
            const validateResource = await request.connection.query(`SELECT * FROM BB_DATA_CENTER WHERE data_center_code = '${request.params.id}'`)
            if (validateResource.length === 0) return response.handlers.error(4001, request, response)
            return response.handlers.error(2001, request, response)
        }

        // Endpoint response
        return response.json({
            data: response.query
        })
    }
}
