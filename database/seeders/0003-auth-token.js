module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('AuthToken Seeder called.');

        models.AuthToken.bulkCreate([
            {
                auth_token: "0000000000000000000000000000000000000000000000000000000000000000",
                user_id: "00000000-0000-0000-0000-000000000000"
            }, {
                auth_token: "1111111111111111111111111111111111111111111111111111111111111111",
                user_id: "11111111-1111-1111-1111-111111111111"
            }
        ]);
    },

    down: function(sequelize, models, plaid) {
        return models.AuthToken.truncate();
    }
};
