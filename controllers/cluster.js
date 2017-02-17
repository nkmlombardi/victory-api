<<<<<<< HEAD
var utility = require('../services/utilities')
var transformers = require('../services/transformers')
=======
const utility = require('../services/utilities')
>>>>>>> 631441fbc108703295b0a31f66fa9d96d400b132

module.exports = {
    getClusters: async (request, response) => {
        try {
<<<<<<< HEAD
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER`)
        } catch(error) { return response.handlers.error(error, request, response) }
=======
            response.query = await request.connection.query('SELECT * FROM BB_ONELINK_CLUSTER')
        } catch (error) {
            return response.handlers.error(error, request, response)
        }
>>>>>>> 631441fbc108703295b0a31f66fa9d96d400b132

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        return response.json({ data: transformers.clusters.collection(response.query) })
    },

    getCluster: async (request, response) => {
        if (utility.isAlphaNumericDashSlashPlus(request.params.id) === false) return response.handlers.error(4002, request, response)

        try {
            response.query = await request.connection.query(`SELECT * FROM BB_ONELINK_CLUSTER WHERE cluster_name = '${request.params.id}'`)
<<<<<<< HEAD
        } catch(error) { return response.handlers.error(error, request, response) }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        response.json({ data: transformers.clusters.singleton(response.query[0]) })
=======
        } catch (error) {
            return response.handlers.error(error, request, response)
        }

        if (response.query.length === 0) return response.handlers.error(4001, request, response)

        return response.json({
            data: response.query[0]
        })
>>>>>>> 631441fbc108703295b0a31f66fa9d96d400b132
    }
}
