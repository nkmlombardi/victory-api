var fs = require('fs')
const chalk = require('chalk')

module.exports = {
    up: (sequelize, models) => {
        console.log(`${chalk.magenta('Category')}         model seeded`)

        return models.Category.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/categories.json', 'utf8'))
        )
    },

    down: (sequelize, models, plaid) => models.Category.truncate()
}
