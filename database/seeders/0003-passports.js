var fs = require('fs')

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('Passport Model Seeder called.')

        return models.Passport.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/passports.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.Passport.truncate()
    }
}
