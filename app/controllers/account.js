module.exports = {
    getSelfAll: function(req, res, next) {
        req.models.PlaidAccount.findAll({
            where: {
                user_id: req.user.id
            }
        }).then(function(accounts) {
            res.json({
                status: req.status.success,
                data: accounts
            });
        });
    },

    getSelfAllWithTransactions: function(req, res, next) {
        req.models.PlaidAccount.findAll({
            where: {
                user_id: req.user.id
            },
            include: [
                {
                    model: req.models.PlaidTransaction,
                    as: 'transactions'
                }
            ]
        }).then(function(accounts) {
            res.json({
                status: req.status.success,
                data: accounts
            });
        });
    },

    postPlaidAccounts: function(req, res, next) {
        req.models.PlaidAccount.bulkCreate(
            req.models.PlaidAccount.fromPlaidArray(
                req.body, req.user
            )
        ).then(function(accounts) {
            return res.json({
                status: req.status.success,
                data: accounts
            })
        })
    }
};
