var moment = require('moment')

module.exports = {
    getSelfAll: function(req, res, next) {
        req.models.Transaction.findAll({
            where: {
                user_id: req.user.id
            }
        }).then(function(transactions) {
            res.json({
                status: req.status.success,
                data: transactions
            })
        })
    },

    getSelfAllWithAll: function(req, res, next) {
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

        req.models.Transaction.findAll({
            where: parameters,
            include: [
                {
                    model: req.models.Account,
                    as: 'account',
                    required: false,
                    attributes: ['id']
                }, {
                    model: req.models.Category,
                    as: 'category',
                    required: false,
                    attributes: ['id'],
                    include: {
                        model: req.models.Budget,
                        as: 'budgets',
                        where: { user_id: req.user.id },
                        required: false,
                        attributes: ['id'],
                        include: {
                            model: req.models.Scenario,
                            as: 'scenario',
                            where: { user_id: req.user.id },
                            required: false,
                            attributes: ['id']
                        }
                    }
                }
            ]
        }).then(function(transactions) {
            res.json({
                status: req.status.success,
                data: transactions
            })
        })
    },

    getSelfAllWithAccounts: function(req, res, next) {
        req.models.Transaction.findAll({
            where: {
                user_id: req.user.id
            },
            include: [
                {
                    model: req.models.Account,
                    as: 'account'
                }
            ]
        }).then(function(transactions) {
            res.json({
                status: req.status.success,
                data: transactions
            })
        })
    },


    /**
     * Endpoint that maps plaid format to database format then injects into the
     * database. It does the mapping by pulling all of a User's accounts, and
     * all of the categores and creating a map of plaid_id => database UUID for
     * the fromPlaidArray model method to reference when setting the instance's
     * account_id and category_id.
     *
     * I ran into a ton of problems trying to figure out how to do this, it
     * seemed like everytime I tried to do all of this inside of the fromPlaidObject
     * model method, there were weird issues with promises and I just couldn't
     * get it to work.
     *
     * TLDR: Here be dragons.
     *
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {Promise}       [description]
     */
    postPlaidTransactions: async function(req, res, next) {
        req.models.Transaction.bulkCreate(
            req.models.Transaction.fromPlaidArray(
                req.body,
                req.user.id,
                req.models.Account.createPlaidMap(
                    await req.models.Account.findAll({
                        where: { user_id: req.user.id },
                        attributes: ['id', 'plaid_id']
                    })
                ),
                await req.models.Category.createPlaidMap(
                    await req.models.Category.findAll({
                        attributes: ['id', 'plaid_id']
                    })
                )
            )
        ).then(function(transactions) {
            console.log('Cat Check: ', transactions[0].category_id)

            return res.json({
                status: req.status.success,
                data: transactions
            })

        }).catch(function(error) {
            console.error('Error persisting plaid transactions: ', error)

            return res.json({
                status: req.status.error,
                data: error
            })
        })
    }
}
