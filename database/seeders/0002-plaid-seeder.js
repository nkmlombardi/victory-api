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
                            data.accounts.map(function(account) {
                                return {
                                    plaid_id: account._id,
                                    plaid_item: account._item,
                                    plaid_user: account._user,
                                    user_id: '00000000-0000-0000-0000-000000000000',
                                    name: account.meta.name,
                                    balance_available: account.balance.available,
                                    balance_current: account.balance.current,
                                    institution_type: account.institution_type,
                                    type: account.type,
                                    subtype: account.subtype
                                }
                            })
                        ).then(function(accounts) {
                            models.PlaidTransaction.bulkCreate(
                                data.transactions.map(function(transaction) {
                                    return {
                                        plaid_id: transaction._id,
                                        plaid_account_id: transaction._account,
                                        user_id: '00000000-0000-0000-0000-000000000000',
                                        name: transaction.name,
                                        amount: transaction.amount,
                                        date: transaction.date,
                                        pending: transaction.pending,
                                        category: transaction.category,
                                        category_id: transaction.category_id
                                    }
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
