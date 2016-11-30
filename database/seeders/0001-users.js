var fs = require('fs')

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('User'.magenta +  '          model seeded')

        return models.User.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/users.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.User.truncate()
    }
}
