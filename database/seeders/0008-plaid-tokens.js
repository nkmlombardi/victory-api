var fs = require('fs')
const chalk = require('chalk')

module.exports = {
    up: (sequelize, models, plaid) => {
        console.log(`${chalk.magenta('PlaidToken')}       model seeded`)

        return models.PlaidToken.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/plaid-token.json', 'utf8'))
        )
    },

    down: (sequelize, models, plaid) => models.PlaidToken.truncate()
}
