module.exports = {
    // Methods by an Administrator

    // getAll: function(req, res, next) {
    //     req.models.PlaidTransaction.findAll()
    //         .then(function(transactions) {
    //             res.json(transactions);
    //         });
    // },
    //
    // get: function(req, res, next) {
    //     req.models.PlaidTransaction.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function(transaction) {
    //         res.json(transaction);
    //     });
    // },
    //
    // post: function(req, res, next) {
    //     req.models.PlaidTransaction.create({
    //         plaid_id: req.body.plaid_id,
    //         user_id: req.body.user_id,
    //         plaid_account_id: req.body.plaid_account_id,
    //         name: req.body.name,
    //         pending: req.body.pending,
    //         category: req.body.category,
    //         category_id: req.body.category_id
    //     }).then(function(transaction) {
    //         res.json(transaction);
    //     });
    // },


    // Methods run by a user on their own account

    /*
        Technically this method should never get called.
     */
    // getSelf: function(req, res, next) {
    //     req.models.PlaidTransaction.findOne({
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
    // },

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

    // postSelf: function(req, res, next) {
    //     req.models.PlaidTransaction.create(
    //         req.body
    //     ).then(function(transaction) {
    //         res.json({
    //             status: req.status.success,
    //             data: transaction
    //         });
    //     });
    // },
    //
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
