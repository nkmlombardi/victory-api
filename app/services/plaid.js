module.exports = {
    postWebhook: function(req, res, next) {
        req.models.User.findOne({
            where: {
                id: req.params.id,
                access_token: req.body.access_token
            }
        }).then(function(user) {
            switch(req.body.code) {
                case 0:
                    console.log(req.body);
                    break;

                case 1:
                    console.log(req.body);
                    break;

                case 2:
                    console.log(req.body);
                    break;

                case 3:
                    console.log(req.body);
                    break;

                case 4:
                    console.log(req.body);
                    break;

                default:
                    console.log(req.body);
                    break;
            }

            res.send('received');
        })
    },

    /*
     * This method makes a request to Plaid to connect a new user into their
     * system. The method supports multi-factor authentication in which a
     * verification code is sent to the user's device. We are creating a
     * PlaidAccount entry and adding the access key to the User model.
     */
    postSelfConnect: function(req, res, next) {
        req.plaid.addConnectUser(req.body.type, {
            username: req.body.username,
            password: req.body.password
        }, {
            list: true,
            webhook: req.plaid.webhook + req.user.id
        }, function(err, mfaRes, response) {
            // mfaRes.mfa is a list of send_methods
            req.plaid.stepConnectUser(mfaRes.access_token, null, {
                send_method: mfaRes.mfa[0],
            }, function(err, mfaRes, response) {
                // code was sent to the device we specified
                req.plaid.stepConnectUser(mfaRes.access_token, '1234', function(err, mfaRes, data) {
                    // TODO: Resolve these promises at the same time using
                    // Promise.all()
                    req.models.User.update({
                        access_token: data.access_token
                    }, {
                        fields: ['access_token'],
                        where: { id: req.user.id }
                    }).then(function(user) {
                        req.models.PlaidAccount.bulkCreate(
                            data.accounts.map(function(account) {
                                return {
                                    plaid_id: account._id,
                                    plaid_item: account._item,
                                    plaid_user: account._user,
                                    user_id: req.user.id,
                                    name: account.meta.name,
                                    balance_available: account.balance.available,
                                    balance_current: account.balance.current,
                                    institution_type: account.institution_type,
                                    type: account.type,
                                    subtype: account.subtype
                                }
                            })
                        ).then(function(accounts) {
                            req.models.PlaidTransaction.bulkCreate(
                                data.transactions.map(function(transaction) {
                                    return {
                                        plaid_id: transaction._id,
                                        plaid_account_id: transaction._account,
                                        user_id: req.user.id,
                                        name: transaction.name,
                                        amount: transaction.amount,
                                        date: transaction.date,
                                        pending: transaction.pending,
                                        category: transaction.category,
                                        category_id: transaction.category_id
                                    }
                                })
                            ).then(function(transactions) {
                                res.json({
                                    status: req.status.success,
                                    data: {
                                        accounts: accounts,
                                        transactions: transactions
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });
    }
};
