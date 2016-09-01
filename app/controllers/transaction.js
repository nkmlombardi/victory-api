module.exports = {
    // Methods by an Administrator

    getTransactionAll: function(req, res, next) {
        req.models.PlaidTransaction.findAll()
            .then(function(transactions) {
                res.json(transactions);
            });
    },

    getTransaction: function(req, res, next) {
        req.models.PlaidTransaction.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(transaction) {
            res.json(transaction);
        });
    },

    postTransaction: function(req, res, next) {
        req.models.PlaidTransaction.create({
            plaid_id: req.body.plaid_id,
            user_id: req.body.user_id,
            plaid_account_id: req.body.plaid_account_id,
            name: req.body.name,
            pending: req.body.pending,
            category: req.body.category,
            category_id: req.body.category_id
        }).then(function(transaction) {
            res.json(transaction);
        });
    },


    // Methods run by a user on their own account

    /*
        Technically this method should never get called.
     */
    getSelfTransaction: function(req, res, next) {
        req.models.PlaidTransaction.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        }).then(function(transaction) {
            res.json(transaction);
        });
    },

    getSelfTransactionAll: function(req, res, next) {
        req.models.PlaidTransaction.findAll({
            where: {
                user_id: req.user.id
            }
        }).then(function(transactions) {
            res.json(transactions);
        });
    },

    patchSelfTransaction: function(req, res, next) {
        req.models.PlaidTransaction.update({
            category: req.body.category_id
        }, {
            fields: ['category_id'],
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        }).then(function(transaction) {
            res.json(transaction);
        });
    }
};
