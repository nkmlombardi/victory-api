var fs = require('fs')
const chalk = require('chalk')

module.exports = {
    up: (sequelize, models) => models.Budget.bulkCreate(
        JSON.parse(fs.readFileSync(__dirname + '/data/budgets.json', 'utf8'))
    ),

    down: (sequelize, models, plaid) => models.Budget.truncate()
}
