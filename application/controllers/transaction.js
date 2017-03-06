const utility = require('../services/utilities')
const database = require('../database').state

module.exports = {
    /**
     * Get resource collection
     * @type {[type]}
     */
    getCollection: async (user, parameters) => {
        parameters.relations = parameters.relations ? parameters.relations.split(',') : null
        let includes = []
        let collection

        if (parameters.relations) {
            if (parameters.relations.includes('account')) {
                includes.push({
                    model: database.models.Account.scope('public'),
                    as: 'account',
                    where: { user_id: user.id },
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
                        model: database.models.Budget.scope('public'),
                        as: 'budgets',
                        where: { user_id: user.id },
                        required: false,

                        // Include Scenario?
                        include: parameters.relations.includes('scenario') ? {
                            model: database.models.Scenario.scope('public'),
                            as: 'scenario',
                            where: { user_id: user.id },
                            required: false
                        } : []
                    } : []
                })
            }
        }

        try {
            collection = await database.models.Transaction.scope('public').findAll({
                where: { user_id: user.id },
                include: includes
            })
        } catch (error) {
            return error
        }

        return collection
    }
}
