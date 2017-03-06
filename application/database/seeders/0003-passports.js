var fs = require('fs')
const chalk = require('chalk')

module.exports = {
    up: (sequelize, models) => models.Passport.bulkCreate(
        JSON.parse(fs.readFileSync(__dirname + '/data/passports.json', 'utf8'))
    ),

    down: (sequelize, models, plaid) => models.Passport.truncate()
}
