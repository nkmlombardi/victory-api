var fs = require('fs')

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('Scenario Model Seeder called.'.italic)

        return models.Scenario.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/scenarios.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.Scenario.truncate()
    }
}
