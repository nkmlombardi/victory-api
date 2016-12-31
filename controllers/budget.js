var moment = require('moment')

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
            category_id: req.body.category_id,
            scenario_id: req.body.scenario_id,
            allowance: req.body.allowance,
            interval: req.body.interval,
            interval_text: req.body.interval_text,
            start: req.body.start,
            end: req.body.end
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
        req.models.Budget.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        }).then(async function(budget) {
            if (budget) {
                budget = (await budget.update({
                    name: req.body.name,
                    category_id: req.body.category_id,
                    scenario_id: req.body.scenario_id,
                    allowance: req.body.allowance,
                    interval: req.body.interval,
                    interval_text: req.body.interval_text,
                    start: req.body.start,
                    end: req.body.end
                })).toJSON()

                budget.category = await req.models.Category.findOne({
                    where: {
                        id: budget.category_id
                    },
                    include: {
                        model: req.models.Transaction,
                        as: 'transactions',
                        required: false,
                        where: {
                            user_id: req.user.id,
                            date: {
                                $gte: moment(budget.period.start).format(),
                                $lte: moment(budget.period.end).format()
                            }
                        }
                    }
                })

                res.json({
                    status: req.status.success,
                    data: budget
                })
            } else {
                var budget = await req.models.Budget.create({
                    user_id: req.user.id,
                    category_id: req.body.category_id,
                    scenario_id: req.body.scenario_id,
                    allowance: req.body.allowance,
                    interval: req.body.interval,
                    interval_text: req.body.interval_text,
                    start: req.body.start,
                    end: req.body.end
                })

                res.json({
                    status: req.status.success,
                    data: budget
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
