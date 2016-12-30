var moment = require('moment')
var Sequelize = require('sequelize')
var util = require('util')

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

    getSelfAllWithTransactions: async function(req, res, next) {
        var scenarios = await req.models.Scenario.findAll({
            where: { user_id: req.user.id },
            order: [['created_at', 'DESC']],
            include: {
                model: req.models.Budget,
                as: 'budgets',
                required: false,

                include: {
                    model: req.models.Category,
                    as: 'category',
                    required: true
                }
            }
        })

        /**
         * We are iterating through each budget and attaching it's transactions based on the
         * current period for the budget. Don't forget that we can't add properties to Sequelize
         * instance objects, so we need to convert them to JSON objects first.
         */
        res.json({
            status: req.status.success,
            data: await Promise.all(scenarios.map(async function(scenario) {
                scenario.budgets = await Promise.all(scenario.budgets.map(async function(budget) {
                    var transactions = await budget.category.getTransactions({
                        where: {
                            date: {
                                $between: [
                                    budget.period.start,
                                    budget.period.end
                                ]
                            }
                        }
                    })

                    budget = budget.toJSON()
                    budget.category.transactions = transactions
                    return budget
                }))

                return scenario
            }))
        })
    },

    getSelf: function(req, res, next) {
        req.models.Scenario.findOne({
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

    getSelfBudgets: function(req, res, next) {
        req.models.Budget.findAll({
            where: {
                scenario_id: req.params.id,
                user_id: req.user.id
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
            name: req.body.name,
            color: req.body.color

        }).then(function(scenario) {
            return res.json({
                status: req.status.success,
                data: scenario
            })
        })
    },

    putSelf: function(req, res, next) {
        req.models.Scenario.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        }).then(function(scenario) {
            if (scenario) {
                scenario.updateAttributes(req.body)
                    .then(function(scenario) {
                        return res.json({
                            status: req.status.success,
                            data: scenario
                        })
                    })
            } else {
                res.json({
                    status: req.status.error,
                    message: 'Scenario does not exist or does not belong to requesting user.'
                })
            }
        })
    },

    deleteSelf: function(req, res, next) {
        req.models.Scenario.destroy({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: (data ? true : false)
            })
        })
    }
}
