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
     getSingleton: async(id) => {
        if (utility.isNumber(id) === false) return new ApiError(4002)

        let singleton

        try {
            singleton = (await database.mysql.query(`
                SELECT *
                FROM BB_PROJECT_TARGET
                WHERE target_id = '${id}'
            `))[0]
        } catch (error) {
            return error
        }

        if (!singleton) return new ApiError(4001)

        return transformers.targets.singleton(singleton)
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
                FROM BB_PROJECT_TARGET
                WHERE is_inactive = 0
                    AND is_hidden = 0
            `)
        } catch (error) {
            return error
        }

        return transformers.targets.collection(collection)
    }
}
