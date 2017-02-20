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
        if (utility.isAlphaNumericDashSlashPlus(id) === false) return new ApiError(4002)
        let singleton

        try {
            singleton = (await database.mysql.query(`
                 SELECT *
                 FROM BB_ONELINK_CLUSTER
                 WHERE cluster_name = '${id}'
             `))[0]
        } catch (error) {
            console.log('error here', error)
            return error
        }

        if (!singleton) return new ApiError(4001)

        return transformers.clusters.singleton(singleton)
    },

    /**
     * Find the resouce collection
     *
     * @param  {object} request
     * @param  {object} response
     * @return {Promise} collection
     */

    getCollection: async() => {
        let collection

        try {
            collection = await database.mysql.query(`
                SELECT *
                FROM BB_ONELINK_CLUSTER
            `)
        } catch (error) {

                console.log('here\'s your problem')
                console.log(error)
            return error
        }

        return transformers.clusters.collection(collection)
    }

}
