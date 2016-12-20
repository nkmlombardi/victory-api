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
    }
}
