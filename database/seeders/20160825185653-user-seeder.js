module.exports = {
    up: function(sequelize, models) {
        console.log('User Seeder called.');

        models.User.bulkCreate([
            {
                email: 'nkmlombardi@gmail.com',
                password: 'password'
            }, {
                email: 'adam.m.hogue@gmail.com',
                password: 'apassword'
            }
        ]);
    },

    down: function(sequelize, models) {
        return models.User.truncate();
    }
};
