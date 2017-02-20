const utility = require('../services/utilities')
const transformers = require('../services/transformers')
const database = require('../database').state

module.exports = {
    /**
     * Find singleton in the resource collection
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} singleton
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
     * Find the resource collection
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
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
     * Find all origin resources that are children of the client resource.
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
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
                    WHERE   client_id = '${id}'
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
