var fs = require('fs')
const chalk = require('chalk')

module.exports = {
    up: (sequelize, models) => models.Transaction.bulkCreate(
        JSON.parse(fs.readFileSync(__dirname + '/data/transactions.json', 'utf8'))
    ),

    down: (sequelize, models, plaid) => models.Transaction.truncate()
}
