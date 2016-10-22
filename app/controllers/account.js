module.exports = {
    // Methods by an Administrator

    // getAll: function(req, res, next) {
    //     req.models.PlaidAccount.findAll()
    //         .then(function(account) {
    //             res.json(account);
    //         });
    // },
    //
    // get: function(req, res, next) {
    //     req.models.PlaidAccount.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function(account) {
    //         res.json(account);
    //     });
    // },

    // post: function(req, res, next) {
    //     req.models.PlaidAccount.create({
    //         plaid_id: req.body.plaid_id,
    //         user_id: req.body.user_id,
    //         plaid_account_id: req.body.plaid_account_id,
    //         name: req.body.name,
    //         pending: req.body.pending,
    //         category: req.body.category,
    //         category_id: req.body.category_id
    //     }).then(function(account) {
    //         res.json(account);
    //     });
    // },


    // Methods run by a user on their own account
    // getSelf: function(req, res, next) {
    //     req.models.PlaidAccount.findOne({
    //         where: {
    //             id: req.params.id,
    //             user_id: req.user.id
    //         }
    //     }).then(function(account) {
    //         res.json({
    //             status: req.status.success,
    //             data: account
    //         });
    //     });
    // },

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

    // postSelf: function(req, res, next) {
    //     req.models.PlaidAccount.create(
    //         req.body
    //     ).then(function(account) {
    //         res.json({
    //             status: req.status.success,
    //             data: account
    //         });
    //     });
    // },
    //
    // patchSelf: function(req, res, next) {
    //     req.models.PlaidAccount.update(req.body, {
    //         fields: [
    //             'balance_available',
    //             'balance_current',
    //             'institution_type',
    //             'type',
    //             'subtype'
    //         ],
    //         where: {
    //             id: req.params.id,
    //             user_id: req.user.id
    //         }
    //     }).then(function(account) {
    //         res.json({
    //             status: req.status.success,
    //             data: account
    //         });
    //     });
    // }
};
