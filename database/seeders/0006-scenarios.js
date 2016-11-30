var fs = require('fs')

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('Scenario'.magenta +  '      model seeded')

        return models.Scenario.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/scenarios.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.Scenario.truncate()
    }
}
