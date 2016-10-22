var fs = require('fs');

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('PlaidAcount Model Seeder called.');

        models.PlaidAccount.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/accounts.json', 'utf8'))
        ).then(function(data) {
            if (data.length > 0 && data != null) {
                console.log('PlaidAccount Models persisted to database.');
            } else {
                console.log('Failed to persist PlaidAccount Models to database');
            }
        });
    },

    down: function(sequelize, models, plaid) {
        return models.PlaidAccount.truncate();
    }
};
