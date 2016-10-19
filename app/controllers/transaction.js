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
                    model: req.models.PlaidAccount
                }
            ]
        }).then(function(transactions) {
            res.json({
                status: req.status.success,
                data: transactions
            });
        });
    },

    // patchSelf: function(req, res, next) {
    //     req.models.PlaidTransaction.update(req.body, {
    //         fields: [
    //             'category',
    //             'category_id'
    //         ],
    //         where: {
    //             id: req.params.id,
    //             user_id: req.user.id
    //         }
    //     }).then(function(transaction) {
    //         res.json({
    //             status: req.status.success,
    //             data: transaction
    //         });
    //     });
    // }
};
