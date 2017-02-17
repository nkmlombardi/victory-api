<<<<<<< HEAD
var utility = require('../services/utilities')
var transformers = require('../services/transformers')
=======
const utility = require('../services/utilities')
>>>>>>> 631441fbc108703295b0a31f66fa9d96d400b132

module.exports = {
    getTargets: async (request, response) => {
        try {
            response.query = await request.connection.query('SELECT * FROM BB_PROJECT_TARGET WHERE is_inactive = 0 AND is_hidden = 0')
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

<<<<<<< HEAD
        response.json({
            data: transformers.targets.collection(response.query)
=======
        return response.json({
            data: response.query
>>>>>>> 631441fbc108703295b0a31f66fa9d96d400b132
        })
    },

    getTarget: async (request, response) => {
        if (utility.isNumber(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_PROJECT_TARGET WHERE target_id = ${request.params.id}`)
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

<<<<<<< HEAD
        response.json({
            data: transformers.targets.singleton(response.query[0])
=======
        return response.json({
            data: response.query[0]
>>>>>>> 631441fbc108703295b0a31f66fa9d96d400b132
        })
    }
}
