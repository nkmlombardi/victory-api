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
            email: req.body.email,
            password: req.body.password
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
                user_id: req.user.id
            }
        }).then(function(transaction) {
            res.json(transaction);
        });
    },

    patchSelfTransaction: function(req, res, next) {
        req.models.PlaidTransaction.update({
            category: req.body.category_id
        }, {
            fields: ['category_id'],
            where: {
                id: id
                user_id: req.user.id
            }
        });
        .then(function(transaction) {
            res.json(transaction);
        });
    }
};
