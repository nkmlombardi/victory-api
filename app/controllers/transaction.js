module.exports = {
    getSelfAll: function(req, res, next) {
        req.models.PlaidTransaction.findAll({
            where: {
                user_id: req.user.id
            }
        }).then(function(transactions) {
            res.json({
                status: req.status.success,
                data: transactions
            });
        });
    },

    getSelfAllWithAccounts: function(req, res, next) {
        req.models.PlaidTransaction.findAll({
            where: {
                user_id: req.user.id
            },
            include: [
                {
                    model: req.models.PlaidAccount,
                    as: 'account'
                }
            ]
        }).then(function(transactions) {
            res.json({
                status: req.status.success,
                data: transactions
            });
        });
    },

    postPlaidTransactions: function(req, res, next) {
        req.models.PlaidTransaction.bulkCreate(
            req.models.PlaidTransaction.fromPlaidArray(
                req.body, req.user
            )
        ).then(function(transactions) {
            return res.json({
                status: req.status.success,
                data: transactions
            })
        })
    }
};
