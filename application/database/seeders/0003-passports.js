var fs = require('fs')
const chalk = require('chalk')

module.exports = {
    up: (sequelize, models) => {
        console.log(`${chalk.magenta('Passport')}         model seeded`)

        return models.Passport.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/passports.json', 'utf8'))
        )
    },

    down: (sequelize, models, plaid) => models.Passport.truncate()
}
