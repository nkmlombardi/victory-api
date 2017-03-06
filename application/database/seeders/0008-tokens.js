var fs = require('fs')
const chalk = require('chalk')

module.exports = {
    up: (sequelize, models) => {
        console.log(`${chalk.magenta('Token')}             model seeded`)

        return models.Token.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/token.json', 'utf8'))
        )
    },

    down: (sequelize, models, plaid) => models.Token.truncate()
}
