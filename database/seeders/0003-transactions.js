var fs = require('fs');

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('PlaidTransaction Model Seeder called.');

        models.PlaidTransaction.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/transactions.json', 'utf8'))
        ).then(function(data) {
            if (data.length > 0 && data != null) {
                console.log('PlaidTransaction Models persisted to database.');
            } else {
                console.log('Failed to persist PlaidTransaction Models to database');
            }
        });
    },

    down: function(sequelize, models, plaid) {
        return models.PlaidTransaction.truncate();
    }
};
