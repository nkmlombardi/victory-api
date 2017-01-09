var fs = require('fs')

module.exports = {
    up: function(sequelize, models) {
        console.log('User Model Seeder called.'.orange)

        return models.User.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/users.json', 'utf8'))
        )
    },

    down: function(sequelize, models) {
        console.log('User Model De-Seeder called.'.yellow)

        return models.User.truncate()
    }
}
