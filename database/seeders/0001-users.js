module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('User Seeder called.');

        models.User.bulkCreate([
            {
                id: '00000000-0000-0000-0000-000000000000',
                email: 'nkmlombardi@gmail.com',
                password: 'password'
            }, {
                id: '11111111-1111-1111-1111-111111111111',
                email: 'adam.m.hogue@gmail.com',
                password: 'apassword'
            }
        ]);
    },

    down: function(sequelize, models, plaid) {
        return models.User.truncate();
    }
};
