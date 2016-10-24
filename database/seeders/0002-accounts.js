var fs = require('fs');

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('PlaidAcount Model Seeder called.');

        return models.PlaidAccount.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/accounts.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.PlaidAccount.truncate();
    }
};
