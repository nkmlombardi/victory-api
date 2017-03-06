const database = require('../database').state

module.exports = {
    /**
     * Gets the collection of resources
     * @return {Promise} [description]
     */
    getCollection: async (user, parameters) => {
        parameters.relations = parameters.relations ? parameters.relations.split(',') : null
        let includes = []
        let collection

        if (parameters.relations) {
            if (parameters.relations.includes('budget')) {
                includes.push({
                    model: database.models.Budget.scope('public'),
                    as: 'budgets',
                    required: false,

                    // Include Budget?
                    include: parameters.relations.includes('scenario') ? {
                        model: database.models.Scenario,
                        as: 'scenario',
                        where: { user_id: user.id },
                        required: false
                    } : []
                })
            }

            if (parameters.relations.includes('transaction')) {
                includes.push({
                    model: database.models.Transaction.scope('public'),
                    as: 'transactions',
                    required: false
                })
            }
        }

        try {
            collection = await database.models.Category.findAll({
                include: includes
            })
        } catch (error) {
            return error
        }

        return collection
    }
}
