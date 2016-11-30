var fs = require('fs')

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('Acount'.magenta +  '        model seeded')

        return models.Account.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/accounts.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.Account.truncate()
    }
}
