module.exports = {
    up: function(sequelize, models, plaid) {
        console.log('Plaid Seeder called.');

        plaid.addConnectUser('chase', {
            username: 'plaid_test',
            password: 'plaid_good'
        }, {
            list: true
        }, function(err, mfaRes, response) {
            plaid.stepConnectUser(mfaRes.access_token, null, {
                send_method: mfaRes.mfa[0],
            }, function(err, mfaRes, response) {
                plaid.stepConnectUser(mfaRes.access_token, '1234', function(err, mfaRes, data) {
                    models.User.update({
                        access_token: data.access_token
                    }, {
                        fields: ['access_token'],
                        where: { id: '00000000-0000-0000-0000-000000000000' }
                    }).then(function(user) {
                        models.PlaidAccount.bulkCreate(
                            models.PlaidAccount.fromPlaidArray(data.accounts, {
                                id: '00000000-0000-0000-0000-000000000000'
                            })
                        ).then(function(accounts) {
                            models.PlaidTransaction.bulkCreate(
                                models.PlaidTransaction.fromPlaidArray(data.transactions, {
                                    id: '00000000-0000-0000-0000-000000000000'
                                })
                            ).then(function(transactions) {
                                return;
                            });
                        });
                    });
                });
            });
        });
    },

    down: function(sequelize, models, plaid) {
        models.PlaidAccount.truncate();
        models.PlaidTransaction.truncate();
        return;
    }
};
