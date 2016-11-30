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
            })
        })
    },

    getSelfAllWithTransactions: function(req, res, next) {
        req.models.Budget.findAll({
            where: {
                user_id: req.user.id
            },
            include: {
                model: req.models.Category,
                as: 'category',
                include: {
                    model: req.models.Transaction,
                    as: 'transactions'
                }
            }
        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    },

    getSelf: function(req, res, next) {
        req.models.Budget.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    },

    getSelfWithTransactions: function(req, res, next) {
        req.models.Budget.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            },
            include: {
                model: req.models.Category,
                as: 'category',
                include: {
                    model: req.models.Transaction,
                    as: 'transactions'
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
        req.models.Budget.create({
            user_id: req.user.id,
            name: req.body.name,
            category_id: req.body.category_id,
            scenario_id: req.body.scenario_id,
            type: req.body.type,
            allowance: req.body.allowance
        }).then(function(budget) {
            return res.json({
                status: req.status.success,
                data: budget
            })
        })
    },

    putSelf: function(req, res, next) {
        req.models.Budget.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            },
            include: {
                model: req.models.Category,
                as: 'category',
                required: false,
                include: {
                    model: req.models.Transaction,
                    as: 'transactions',
                    required: false
                }
            }
        }).then(function(budget) {
            var category = budget.category

            if (budget) {
                budget.updateAttributes(req.body).then(function(budget) {
                    budget.category = category

                    return res.json({
                        status: req.status.success,
                        data: budget
                    })
                })
            } else {
                res.json({
                    status: req.status.error,
                    message: 'Budget does not exist or does not belong to requesting user.'
                })
            }
        })
    },

    deleteSelf: function(req, res, next) {
        req.models.Budget.destroy({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    }
}
