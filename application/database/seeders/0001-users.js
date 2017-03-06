const fs = require('fs')
const chalk = require('chalk')

module.exports = {
    up: (sequelize, models) => {
        console.log(`${chalk.magenta('User')}             model seeded`)

        return models.User.bulkCreate(
            JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf8'))
        )
    },

    down: (sequelize, models) => models.User.truncate()
}
