/*
 * This method makes a request to Plaid to connect a new user into their
 * system. The method supports multi-factor authentication in which a
 * verification code is sent to the user's device. We are creating a
 * PlaidAccount entry and adding the access key to the User model.
 */
module.exports = function(req, res, next) {
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
};
