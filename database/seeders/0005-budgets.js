// var plaidLib = require('plaid');
var fs = require('fs');

module.exports = {
    up: function(sequelize, models, plaid) {
        // models.PlaidCategory.bulkCreate(
        //     models.PlaidCategory.fromPlaidArray(
        //         JSON.parse(fs.readFileSync(__dirname + '/data/budgets.json', 'utf8'))
        //     )
        // ).then(function(categories) {
        //     console.log('Categories persisted to database.');
        // });
    },

    down: function(sequelize, models, plaid) {
        // return models.PlaidCategory.truncate();
    }
};
