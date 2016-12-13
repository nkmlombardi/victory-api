var moment = require('moment')
var _ = require('lodash')
require('moment-range')

module.exports = {
    getSelfAll: function(req, res, next) {
        req.models.Account.findAll({
            where: {
                user_id: req.user.id
            }
        }).then(function(accounts) {
            res.json({
                status: req.status.success,
                data: accounts
            })
        })
    },

    getSelfAllWithTransactions: function(req, res, next) {
        req.models.Account.findAll({
            where: {
                user_id: req.user.id
            },
            include: [
                {
                    model: req.models.Transaction,
                    as: 'transactions'
                }
            ]
        }).then(function(accounts) {
            res.json({
                status: req.status.success,
                data: accounts
            })
        })
    },

    postPlaidAccounts: function(req, res, next) {
        req.models.Account.bulkCreate(
            req.models.Account.fromPlaidArray(
                req.body, req.user
            )
        ).then(function(accounts) {
            return res.json({
                status: req.status.success,
                data: accounts
            })
        }).catch(function(error) {
            console.error('Error persisting plaid accounts: ', error)

            return res.json({
                status: req.status.error,
                data: error
            })
        })
    },

    getNetWorthHistory: async function(req, res, next) {
        var parameters = {
            user_id: req.user.id
        }

        // if (req.query.startDate && req.query.endDate) {
        //     parameters.date = {
        //         $between: [
        //             moment(req.query.startDate).format(),
        //             moment().format()
        //         ]
        //     }
        // }

        var startDate = moment().subtract(1, 'year')
        var endDate = moment()

        var accounts = await req.models.Account.findAll({
            attributes: ['balance_current'],
            where: parameters
        })

        var currentNetWorth = accounts.reduce(function(previous, current) {
            return previous + current.balance_current
        }, 0)

        var transactions = await req.models.Transaction.findAll({
            attributes: ['date', 'amount'],
            where: parameters
        })


        var DATE_FORMAT = 'YYYY-MM-DD'
        var transactionDays = _.groupBy(transactions, function(transaction) {
            return moment(transaction.date).startOf('day').format(DATE_FORMAT)
        })

        var netWorths = {}

        moment.range(startDate, endDate).by('days', function(day) {
            var dateFormatted = day.startOf(day).format(DATE_FORMAT)

            // If there are no transactions for that day, then return zero
            if (!transactionDays[dateFormatted]) {
                netWorths[dateFormatted] = 0
            } else {
                netWorths[dateFormatted] = transactionDays[dateFormatted].reduce(function(previous, current) {
                    return previous + current.amount
                }, 0)
            }

        })

        Object.keys(netWorths).sort(function(a, b) {
            return a < b ? 1 : -1
        }).forEach(function(date) {
            if (date === endDate.format(DATE_FORMAT)) {
                netWorths[date] += currentNetWorth
            } else {
                netWorths[date] += Math.round(netWorths[moment(date).add(1, 'day').startOf('day').format(DATE_FORMAT)])
            }
        })

        return res.json({
            status: req.status.success,
            data: netWorths
        })
    }
}
