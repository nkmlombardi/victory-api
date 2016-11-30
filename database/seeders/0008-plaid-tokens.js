var fs = require('fs')

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('PlaidToken Model Seeder called.'.italic)

        return models.PlaidToken.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/plaid-token.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.PlaidToken.truncate()
    }
}
