var fs = require('fs');

module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('User Model Seeder called.');

        models.User.bulkCreate(
            JSON.parse(fs.readFileSync(__dirname + '/data/users.json', 'utf8'))
        ).then(function(data) {
            if (data.length > 0 && data != null) {
                console.log('User Models persisted to database.');
            } else {
                console.log('Failed to persist User Models to database');
            }
        });
    },

    down: function(sequelize, models, plaid) {
        return models.User.truncate();
    }
};
