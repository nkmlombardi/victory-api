var fs = require('fs');

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('AuthToken Model Seeder called.');

        models.AuthToken.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/tokens.json', 'utf8'))
        ).then(function(data) {
            if (data.length > 0 && data != null) {
                console.log('AuthToken Models persisted to database.');
            } else {
                console.log('Failed to persist AuthToken Models to database');
            }
        });
    },

    down: function(sequelize, models, plaid) {
        return models.AuthToken.truncate();
    }
};
