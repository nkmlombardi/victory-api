const utility = require('../services/utilities')
const transformers = require('../services/transformers')
const database = require('../database').state

module.exports = {

    /**
     * Get cluster singleton
     * @param  {[type]}  id [unique cluster identifier]
     * @return {Promise}    [description]
     */
    getSingleton: async (id) => {
        if (utility.isAlphaNumericDashSlashPlus(id) === false) return new ApiError(4002)
        let singleton

        try {
            singleton = (await database.mysql.query(`
                SELECT *
                FROM BB_ONELINK_CLUSTER
                WHERE cluster_name = '${id}'
            `))[0]
        } catch (error) {
            return error
        }

        if (!singleton) return new ApiError(4001)

        return transformers.clusters.singleton(singleton)
    },

    /**
     * Get cluster collection
     * @type {[type]}
     */
    getCollection: async () => {
        let collection

        try {
            collection = await database.mysql.query(`
                SELECT *
                FROM BB_ONELINK_CLUSTER
            `)
        } catch (error) {
            return error
        }

        return transformers.clusters.collection(collection)
    }

}
