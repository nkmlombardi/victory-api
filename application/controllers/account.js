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
            if (parameters.relations.includes('transaction')) {
                includes.push({
                    model: database.models.Transaction.scope('public'),
                    as: 'transactions',
                    where: { user_id: user.id },
                    required: false
                })
            }
        }

        try {
            collection = await database.models.Account.scope('public').findAll({
                where: { user_id: user.id },
                include: includes
            })
        } catch (error) {
            return error
        }

        return collection
    }
}
