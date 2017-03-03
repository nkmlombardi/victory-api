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
                WHERE target_id = ${id}
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
    getCollection: async (query) => {
        let collection

        const limit = query.limit || 999999
        const offset = query.offset || 0

        try {
            collection = await database.mysql.query(`
                SELECT *
                FROM BB_PROJECT_TARGET
                WHERE is_inactive = 0
                    AND is_hidden = 0
                LIMIT ${limit}
                OFFSET ${offset}
            `)
        } catch (error) {
            return error
        }

        return transformers.targets.collection(collection)
    },


    /**
     * Find all of an target's health history entries
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
     */
    getHealthHistory: async (id) => {
        if (utility.isNumber(id) === false) return new ApiError(4002)

        let collection

        try {
            collection = await database.mysql.query(`
                SELECT *
                FROM BB_PROJECT_TARGET_HEALTH_LOG
                WHERE target_id = ${id}
                    AND health_dtm BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
                ORDER BY health_dtm DESC
            `)
        } catch (error) {
            console.log('aaa', error)
            return error
        }

        return collection.map(item => transformers.targets.health(item))
    },


    /**
     * Find all of an target's dispatch history entries
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
     */
    getDispatchHistory: async (id) => {
        if (utility.isNumber(id) === false) return new ApiError(4002)

        let collection

        try {
            collection = await database.mysql.query(`
                SELECT *
                FROM NOC_EVENT_DISPATCH
                WHERE noc_dispatch_object = 'BB_PROJECT_TARGET_HEALTH'
                    AND noc_dispatch_object_id = ${id}
                ORDER BY noc_dispatch_start_dtm DESC
                LIMIT 10
            `)
        } catch (error) {
            return error
        }

        return collection.map(item => transformers.targets.dispatch(item))
    }
}
