var fs = require('fs');

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('Budget Model Seeder called.');

        models.Budget.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/budgets.json', 'utf8'))
        ).then(function(data) {
            if (data.length > 0 && data != null) {
                console.log('Budget Models persisted to database.');
            } else {
                console.log('Failed to persist Budget Models to database');
            }
        });
    },

    down: function(sequelize, models, plaid) {
        return models.Budget.truncate();
    }
};
