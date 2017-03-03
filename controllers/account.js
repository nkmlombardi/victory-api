const database = require('../database').state

module.exports = {
    /**
     * Gets the collection of resources
     * @return {Promise} [description]
     */
    getCollection: async (user) => {
        console.log(user)
        
        let collection

        try {
            collection = await database.models.Account.findAll({
                where: { user_id: user.id },
                include: [{
                    model: database.models.Transaction,
                    as: 'transactions'
                }]
            })
        } catch (error) {
            return error
        }

        return collection
    }
}
