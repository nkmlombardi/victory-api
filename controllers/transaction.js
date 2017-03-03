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
     * Get resource collection
     * @type {[type]}
     */
    getCollection: async (user, parameters) => {
        parameters.relations = parameters.relations.split(',')
        let includes = []
        let collection

        if (parameters.relations) {
            console.log('URL Parameters: ', parameters)

            if (parameters.relations.includes('account')) {
                includes.push({
                    model: database.models.Account,
                    as: 'account',
                    required: false
                })
            }

            if (parameters.relations.includes('category')) {
                includes.push({
                    model: database.models.Category,
                    as: 'category',
                    required: false,

                    // Include Budget?
                    include: parameters.relations.includes('budget') ? {
                        model: database.models.Budget,
                        as: 'budgets',
                        where: { user_id: user.id },
                        required: false,

                        // Include Scenario?
                        include: parameters.relations.includes('scenario') ? {
                            model: database.models.Scenario,
                            as: 'scenario',
                            where: { user_id: user.id },
                            required: false
                        } : []
                    } : []
                })
            }
        }

        try {
            collection = await database.models.Transaction.findAll({
                where: { user_id: user.id },
                include: includes
            })
        } catch (error) {
            return error
        }

        return collection
    }

}
