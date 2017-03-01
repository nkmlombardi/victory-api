const utility = require('../services/utilities')
const transformers = require('../services/transformers')
const database = require('../database').state

module.exports = {
    /**
     * Get origin singleton
     * @param  {[type]}  id [unique origin identifier]
     * @return {Promise}    [description]
     */
    getSingleton: async (id) => {
        if (utility.isNumber(id) === false) return new ApiError(4002)

        let singleton

        try {
            singleton = (await database.mysql.query(`
                SELECT *
                FROM BB_PROJECT_ORIGIN
                WHERE origin_id = '${id}'
            `))[0]
        } catch (error) {
            return error
        }

        if (!singleton) return new ApiError(4001)

        return transformers.origins.singleton(singleton)
    },


    /**
     * Get origin collection
     * @return {Promise} [description]
     */
    getCollection: async () => {
        let collection

        try {
            collection = await database.mysql.query(`
                SELECT
                    origin.*,
                    client.notification_level
                FROM
                    BB_CLIENT           AS client,
                    BB_PROJECT          AS project,
                    BB_PROJECT_ORIGIN   AS origin
                WHERE origin.project_id = project.project_id
                    AND client.client_id = project.client_id
                    AND origin.is_inactive = 0
                    AND origin.is_hidden = 0
            `)
        } catch (error) {
            return error
        }

        return transformers.origins.collection(collection)
    },


    /**
     * Get targets of specified origin
     * @param  {[type]}  id [unique origin identifier]
     * @return {Promise}    [description]
     */
    getTargets: async (id) => {
        if (utility.isNumber(id) === false) return new ApiError(4002)
        let collection

        try {
            collection = await database.mysql.query(`
                SELECT *
                FROM BB_PROJECT_TARGET
                WHERE origin_id = '${id}'
                    AND is_inactive = 0
                    AND is_hidden = 0
            `)
        } catch (error) {
            return error
        }

        return transformers.targets.collection(collection)
    },


    /**
     * Get health history of specified origin
     * @param  {[type]}  id [unique origin indentifier]
     * @return {Promise}    [description]
     */
    getHealthHistory: async (id) => {
        if (utility.isNumber(id) === false) return new ApiError(4002)

        let collection

        try {
            collection = await database.mysql.query(`
                SELECT *
                FROM BB_PROJECT_ORIGIN_HEALTH_LOG
                WHERE origin_id = '${id}'
                    AND health_dtm BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
                ORDER BY health_dtm DESC
            `)
        } catch (error) {
            return error
        }

        return transformers.origins.collection(collection)
    },


    /**
     * Get dispatch history of specified origin
     * @param  {[type]}  id [unique origin identifier]
     * @return {Promise}    [description]
     */
    getDispatchHistory: async (id) => {
        if (utility.isNumber(id) === false) return new ApiError(4002)

        let collection

        try {
            collection = await database.mysql.query(`
                SELECT *
                FROM NOC_EVENT_DISPATCH
                WHERE noc_dispatch_object = 'BB_PROJECT_ORIGIN_HEALTH'
                    AND noc_dispatch_object_id = '${id}'
                ORDER BY noc_dispatch_start_dtm DESC
                LIMIT 10
            `)
        } catch (error) {
            return error
        }

        return transformers.origins.collection(collection)
    }

}
