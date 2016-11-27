module.exports = {
    getSelfAll: function(req, res, next) {
        req.models.Scenario.findAll({
            where: { user_id: req.user.id }

        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    },

    getSelfAllWithBudgets: function(req, res, next) {
        req.models.Scenario.findAll({
            where: { user_id: req.user.id },
            include: {
                model: req.models.Budget,
                as: 'budgets',
                where: { user_id: req.user.id }
            }

        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    },

    getSelfAllWithCategory: function(req, res, next) {
        req.models.Scenario.findAll({
            where: { user_id: req.user.id },
            include: {
                model: req.models.Budget,
                as: 'budgets',
                where: { user_id: req.user.id },
                include: {
                    model: req.models.Category,
                    as: 'category'
                }
            }

        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    },

    getSelfAllWithTransactions: function(req, res, next) {
        req.models.Scenario.findAll({
            where: { user_id: req.user.id },
            include: {
                model: req.models.Budget,
                as: 'budgets',
                include: {
                    model: req.models.Category,
                    as: 'category',
                    include: {
                        model: req.models.Transaction,
                        as: 'transactions'
                    }
                }
            }

        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    },

    postSelf: function(req, res, next) {
        req.models.Scenario.create({
            user_id: req.user.id,
            name: req.body.name

        }).then(function(scenario) {
            return res.json({
                status: req.status.success,
                data: scenario
            })
        })
    }
}
