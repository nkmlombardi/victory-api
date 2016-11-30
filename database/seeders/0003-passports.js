var fs = require('fs')

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('Passport'.magenta +  '      model seeded')

        return models.Passport.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/passports.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.Passport.truncate()
    }
}
