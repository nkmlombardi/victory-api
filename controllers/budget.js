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

    postSelf: async function(req, res, next) {
        var budget = await req.models.Budget.create({
            user_id: req.user.id,
            name: req.body.name,
            category_id: req.body.category_id,
            scenario_id: req.body.scenario_id,
            type: req.body.type,
            allowance: req.body.allowance
        })

        var budgetWithRelations = await req.models.Budget.findOne({
            where: {
                id: budget.id,
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
        })

        return res.json({
            status: req.status.success,
            data: budgetWithRelations
        })
    },

    putSelf: async function(req, res, next) {
        console.log('Payload: ', req.body)
        var budget = await req.models.Budget.findOne({
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
        })

        if (budget) {
            var category = budget.category
            var updateBudget = budget.updateAttributes(req.body)
            updateBudget.category = category

            return res.json({
                status: req.status.success,
                data: budget
            })

        /**
         * Needs to be refactored, just copied from POST
         */
        } else {
            var newBudget = await req.models.Budget.create({
                user_id: req.user.id,
                name: req.body.name,
                category_id: req.body.category_id,
                scenario_id: req.body.scenario_id,
                type: req.body.type,
                allowance: req.body.allowance
            })

            var budgetWithRelations = await req.models.Budget.findOne({
                where: {
                    id: newBudget.id,
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
            })

            return res.json({
                status: req.status.success,
                data: budgetWithRelations
            })
        }
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
