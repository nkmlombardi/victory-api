const fs = require('fs')
const colors = require('colors')

module.exports = {
    up: (sequelize, models) => {
        if (process.env.NODE_ENV !== 'test') {
            console.log(colors.yellow('User Model Seeder'), 'called.')
        }
        return models.User.bulkCreate(
            JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf8'))
        )
    },

    down: (sequelize, models) => {
        if (process.env.NODE_ENV !== 'test') {
            console.log(colors.yellow('User Model De-Seeder'), 'called.')
        }
        return models.User.truncate()
    }
}
