var fs = require('fs');

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('AuthToken Model Seeder called.');

        return models.AuthToken.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/tokens.json', 'utf8'))
        )
    },

    down: function(sequelize, models, plaid) {
        return models.AuthToken.truncate();
    }
};
