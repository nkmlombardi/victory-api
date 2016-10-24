var fs = require('fs');

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('PlaidTransaction Model Seeder called.');

        return models.PlaidTransaction.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/transactions.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.PlaidTransaction.truncate();
    }
};
