var fs = require('fs')

module.exports = {
    up: function(sequelize, models) {
        if (process.env.NODE_ENV !== 'test'){
            console.log('User Model Seeder called.'.yellow)
        }
        return models.User.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/users.json', 'utf8'))
        )
    },

    down: function(sequelize, models) {
        if (process.env.NODE_ENV !== 'test'){
            console.log('User Model De-Seeder called.'.yellow)
        }
        return models.User.truncate()
    }
}
