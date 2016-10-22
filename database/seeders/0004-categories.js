var fs = require('fs');

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('PlaidCategory Model Seeder called.');

        models.PlaidCategory.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/categories.json', 'utf8'))
        ).then(function(data) {
            if (data.length > 0 && data != null) {
                console.log('PlaidCategory Models persisted to database.');
            } else {
                console.log('Failed to persist PlaidCategory Models to database');
            }
        });
    },

    down: function(sequelize, models, plaid) {
        return models.PlaidCategory.truncate();
    }
};
