module.exports = {
    webhook: function(req, res, next) {
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
    connect: function(req, res, next) {
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

                    // Persist Plaid Accounts to database
                    }).then(function(user) {
                        req.models.PlaidAccount.bulkCreate(
                            req.models.PlaidAccount.fromPlaidArray(
                                data.accounts, req.user
                            )

                        // Persist Plaid Transactions to database
                        ).then(function(accounts) {
                            req.models.PlaidTransaction.bulkCreate(
                                req.models.PlaidTransactions.fromPlaidArray(
                                    data.transactions, req.user
                                )

                            // Return Accounts & Transactions
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
    },

    /*
        Exchange public token generated by plaid-link on the client-side for a
        server-side access_token that is stored on the user's database row for
        future requests.
    */
    exchange: function(req, res, next) {
        var public_token = req.body.public_token;
        var returning = req.body.returning;

        // Exchange a public_token for a Plaid access_token
        req.plaid.exchangeToken(public_token, function(err, exchangeTokenRes) {
            if (err != null) { /* Handle Error */ }

            // This is your Plaid access token - store somewhere persistent
            // The access_token can be used to make Plaid API calls to
            // retrieve accounts and transactions
            var access_token = exchangeTokenRes.access_token;

            // Persist the access_token
            req.models.User.update({
                access_token: access_token
            }, {
                fields: ['access_token'],
                where: { id: req.user.id }
            }).then(function(user) {

                // Retrieve user's accounts with token
                req.plaid.getAuthUser(access_token, function(err, authRes) {
                    if (err != null) { /* Handle Error */ }

                    // An array of accounts for this user, containing account
                    // names, balances, and account and routing numbers.
                    var accounts = authRes.accounts;

                    // Generate promises and resolve all
                    Promise.all(accounts.map(function(account) {
                        return req.models.PlaidAccount.upsertWithReturn({
                            where: {
                                plaid_id: account._id
                            },
                            defaults: req.models.PlaidAccount.fromPlaidObject(
                                account, req.user
                            )
                        });
                    })).then(function(accounts) {
                        res.json({
                            status: req.status.success,
                            data: (returning ? accounts : {
                                updated: true
                            })
                        });
                    });
                });
            });
        });
    }
};