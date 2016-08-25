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
        ], { returning: true })
            .success(function() {
                console.log('Users inserted');
            })
            .error(function(error) {
                console.log(error);
            });
    },

    down: function(sequelize, models) {
        return models.User.truncate();
    }
};
