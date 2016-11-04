module.exports = {
    getSelfAll: function(req, res, next) {
        req.models.Budget.findAll({
            where: {
                user_id: req.user.id
            }
        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            });
        });
    },

    getSelfAllWithTransactions: function(req, res, next) {
        req.models.Budget.findAll({
            where: {
                user_id: req.user.id
            },
            include: {
                model: req.models.Transaction,
                as: 'transactions'
            }
        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            });
        });
    }
};
