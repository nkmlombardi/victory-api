const utility = require('../services/utilities')
const transformers = require('../services/transformers')
const database = require('../database').state

module.exports = {

    /**
     * Get target singleton
     * @param  {[type]}  id [unique target identifier]
     * @return {Promise}    [description]
     */
     getSingleton: async (id) => {
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
     * Get target collection
     * @return {Promise} [description]
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
