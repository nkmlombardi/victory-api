const utility = require('../services/utilities')
const transformers = require('../services/transformers')
const database = require('../database').state

module.exports = {
    /**
     * Gets the client singleton
     * @param  {[value]}  id [unique client identifier]
     * @return {Promise}    [description]
     */
    getSingleton: async (id) => {
        if (utility.isNumber(id) === false) return new ApiError(4002)

        let singleton

        try {
            singleton = (await database.mysql.query(`
                SELECT *
                FROM BB_CLIENT
                WHERE client_id = '${id}'
            `))[0]
        } catch (error) {
            return error
        }

        if (!singleton) return new ApiError(4001)

        return transformers.clients.singleton(singleton)
    },

    /**
     * Gets the collection of clients
     * @return {Promise} [description]
     */
    getCollection: async () => {
        let collection

        try {
            collection = await database.mysql.query(`
                SELECT *
                FROM BB_CLIENT
                WHERE is_inactive = 0
                    AND is_hidden = 0
            `)
        } catch (error) {
            return error
        }

        return transformers.clients.collection(collection)
    },



    /**
     * Get the origins for a specified client
     * @param  {[type]}  id [unique client identifier]
     * @return {Promise}    [description]
     */
    getOrigins: async (id) => {
        if (utility.isNumber(id) === false) return new ApiError(4002)

        let collection

        try {
            collection = await database.mysql.query(`
                SELECT  *
                FROM    BB_PROJECT_ORIGIN
                WHERE   project_id  IN (
                    SELECT  project_id
                    FROM    BB_PROJECT
                    WHERE   client_id = ${id}
                        AND is_inactive = 0
                        AND is_hidden = 0
                )
            `)
        } catch (error) {
            return error
        }

        if (collection.length === 0) return new ApiError(4001)

        return transformers.origins.collection(collection)
    }
}
