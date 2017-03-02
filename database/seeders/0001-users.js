const fs = require('fs')
const chalk = require('chalk')

module.exports = {
    up: (sequelize, models) => {
        if (process.env.NODE_ENV !== 'test') {
            console.log(chalk.yellow('User Model:              '),'seeder called.')
        }
        return models.User.bulkCreate(
            JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf8'))
        )
    },

    down: (sequelize, models) => {
        if (process.env.NODE_ENV !== 'test') {
            console.log(chalk.yellow('User Model:           '),'de-seeder called.')
        }
        return models.User.truncate()
    }
}
