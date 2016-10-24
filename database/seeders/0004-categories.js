var fs = require('fs');

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('PlaidCategory Model Seeder called.');

        return models.PlaidCategory.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/categories.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.PlaidCategory.truncate();
    }
};
