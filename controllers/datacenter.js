const utility = require('../services/utilities')
const transformers = require('../services/transformers')
const database = require('../database').state

module.exports = {

    /**
     * Get datacenter singleton
     * @param  {[type]}  id [unique datacenter identifier]
     * @return {Promise}    [description]
     */
    getSingleton: async (id) => {
        if (utility.isUppercaseDashColon(id) === false) return new ApiError(4002)

        let singleton

        try {
            singleton = (await database.mysql.query(`
                SELECT *
                FROM BB_DATA_CENTER
                WHERE data_center_code = '${id}'
            `))[0]
        } catch (error) {
            return error
        }

        if (!singleton) return new ApiError(4001)

        return transformers.datacenters.singleton(singleton)
    },


    /**
     * Get datacenter collection
     * @return {Promise} [description]
     */
    getCollection: async () => {
        let collection

        try {
            collection = await database.mysql.query(`
                SELECT *
                FROM BB_DATA_CENTER
                WHERE is_active = 1
            `)
        } catch (error) {
            return error
        }

        return transformers.datacenters.collection(collection)
    },


    /**
     * Get clusters of a datacenter singleton
     * @param  {[type]}  id [unique datacenter identifier]
     * @return {Promise}    [description]
     */
    getClusters: async (id) => {
        // Pre-database checks
        if (utility.isUppercaseDashColon(id) === false) return new ApiError(4002)

        let collection

        // Database query
        try {
            collection = await database.mysql.query(`
                SELECT *
                FROM BB_ONELINK_CLUSTER
                WHERE data_center = '${id}'
            `)
        } catch (error) {
            return error
        }

        // Post-database checks
        if (collection.length === 0) return new ApiError(4001)

        // Endpoint response
        return transformers.clusters.collection(collection)
    }

}
