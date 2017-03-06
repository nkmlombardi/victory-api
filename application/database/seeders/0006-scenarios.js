var fs = require('fs')
const chalk = require('chalk')

module.exports = {
    up: (sequelize, models) => {
        console.log(`${chalk.magenta('Scenario')}         model seeded`)

        return models.Scenario.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/scenarios.json', 'utf8'))
        )
    },

    down: (sequelize, models, plaid) => models.Scenario.truncate()
}
