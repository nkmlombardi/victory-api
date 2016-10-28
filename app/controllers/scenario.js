module.exports = {
    getSelfAll: function(req, res, next) {
        req.models.Scenario.findAll({
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

    getSelfAllWithBudgets: function(req, res, next) {
        req.models.Scenario.findAll({
            where: {
                user_id: req.user.id
            },
            include: [
                {
                    model: req.models.Budget,
                    as: 'budgets'
                }
            ]
        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            });
        });
    },

    getSelfAllWithCategory: function(req, res, next) {
        req.models.Scenario.findAll({
            where: {
                user_id: req.user.id
            },
            include: [
                {
                    model: req.models.Budget,
                    as: 'budgets',
                    include: {
                        model: req.models.PlaidCategory,
                        as: 'category'
                    }
                }
            ]
        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            });
        });
    },

    getSelfAllWithTransactions: function(req, res, next) {
        req.models.Scenario.findAll({
            where: {
                user_id: req.user.id
            },
            include: [
                {
                    model: req.models.Budget,
                    as: 'budgets',
                    include: {
                        model: req.models.PlaidCategory,
                        as: 'category',
                        include: {
                            model: req.models.PlaidTransaction,
                            as: 'transactions'
                        }
                    }
                }
            ]
        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            });
        });
    }
};
