// var plaidLib = require('plaid');
var fs = require('fs');

module.exports = {

    up: function(sequelize, models, plaid) {
    //     console.log('PlaidCategory Seeder called.');
    //
    //     plaidLib.getCategories(plaidLib.environments.tartan, function(error, response) {
    //         if (error) {
    //             console.error('Failed to persist Plaid Categories to database!', error);
    //         }
    //
    //         console.log(response);
    //
                models.PlaidCategory.bulkCreate(
                    models.PlaidCategory.fromPlaidArray(
                        JSON.parse(fs.readFileSync(__dirname + '/data/categories.json', 'utf8'))
                    )
                ).then(function(categories) {
                    console.log('Categories persisted to database.');
                });
    //     });
    },

    down: function(sequelize, models, plaid) {
        return models.PlaidCategory.truncate();
    }
};
