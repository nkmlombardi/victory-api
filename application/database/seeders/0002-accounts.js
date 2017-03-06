var fs = require('fs')
const chalk = require('chalk')

module.exports = {
    up: (sequelize, models) => models.Account.bulkCreate(
        JSON.parse(fs.readFileSync(__dirname + '/data/accounts.json', 'utf8'))
    ),

    down: (sequelize, models, plaid) => models.Account.truncate()
}
