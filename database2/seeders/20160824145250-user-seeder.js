module.exports = {
    up: function(sequelize, models) {
        console.log('User Seeder called.');

        models.User.bulkCreate([
            {
                email: 'nlombardi@translations.com',
                password: 'password123'
            },
            {
                email: 'pegjeltema@translations.com',
                password: 'iluvandrew123'
            }
        ]);
    },

    down: function(sequelize, models) {
        return models.User.truncate();
    }
};
