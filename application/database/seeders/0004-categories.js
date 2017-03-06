var fs = require('fs')
const chalk = require('chalk')

module.exports = {
    up: (sequelize, models) => models.Category.bulkCreate(
        JSON.parse(fs.readFileSync(__dirname + '/data/categories.json', 'utf8'))
    ),

    down: (sequelize, models, plaid) => models.Category.truncate()
}
