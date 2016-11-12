var fs = require('fs')

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('Transaction Model Seeder called.'.italic)

        return models.Transaction.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/transactions.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.Transaction.truncate()
    }
}
