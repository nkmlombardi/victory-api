var moment = require('moment')

module.exports = {
    getAll: function(req, res, next) {
        var query = {}
        if (req.query.attributes) {
            query = {
                attributes: req.query.attributes
            }
        }

        req.models.Category.findAll(query)
            .then(function(categories) {
                res.json({
                    status: req.status.success,
                    data: categories
                })
            })
    },

    getAllWithRelations: function(req, res, next) {
        var isRequired = req.query.required || false

        var parameters = {
            user_id: req.user.id
        }

        if (req.query.startDate && req.query.endDate) {
            parameters.date = {
                $between: [
                    moment(req.query.startDate).format(),
                    moment(req.query.endDate).format()
                ]
            }
        }

        req.models.Category.findAll({
            include: {
                model: req.models.Transaction,
                as: 'transactions',
                required: isRequired,
                where: parameters
            }
        }).then(function(categories) {
            res.json({
                status: req.status.success,
                data: categories
            })
        })
    },

    getAllPrimary: function(req, res, next) {
        req.models.Category.findAll()
            .then(function(categories) {
                res.json({
                    status: req.status.success,
                    data: categories.filter(function(category) {
                        var digits = Number(category.plaid_id.substring(0, 2) + "000000")
                        if (category.plaid_id % digits === 0) {
                            return category
                        }
                    })
                })
            })
    }
}
