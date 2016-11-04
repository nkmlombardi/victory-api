var moment = require('moment');

/**
 * [retrieveTransactions description]
 * @param  {[type]}  models  [description]
 * @param  {[type]}  plaid   [description]
 * @param  {[type]}  user_id [description]
 * @param  {[type]}  token   [description]
 * @return {Promise}         [description]
 */
var retrieveTransactions = async function(models, plaid, user_id, token) {
    var latestTransaction = await models.Transaction.findOne({
        where: { user_id: user_id },
        order: [['created_at', 'DESC']],
        attributes: ['created_at', 'user_id']
    })

    var transactionsResponse = await plaid.getConnectUserAsync(token, {
        pending: true,
        gte: moment(latestTransaction.created_at).format("MM/DD/YY")
    })

    if (transactionsResponse.transactions.length === 0) {
        return {
            status: 'unmodified',
            message: 'No new transactions to retrieve.',
            transactions: []
        }
    }

    var transactions = await models.Transaction.bulkCreate(
        await models.Transaction.fromPlaidArray(
            transactionsResponse.transactions,
            user_id
        )
    )

    return {
        status: 'success',
        message: 'New transactions retrieved.',
        payload: transactionsResponse.transactions
    }
};

module.exports = retrieveTransactions;
