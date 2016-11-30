var fs = require('fs')

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('Budget'.magenta +  '        model seeded')

        return models.Budget.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/budgets.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.Budget.truncate()
    }
}
