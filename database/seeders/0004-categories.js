var fs = require('fs')

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('Category Model Seeder called.')

        return models.Category.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/categories.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.Category.truncate()
    }
}
