var moment = require('moment');

module.exports = function(options, callback) {
    var models = options.models;
    var plaid = options.plaid;
    var user = options.user;
    var token = options.token;
    var count = options.count;

    return models.PlaidTransaction.findOne({
        where: { user_id: user.id },
        order: [['created_at', 'DESC']],
        attributes: ['created_at', 'user_id']

    // Retrieve all transactions since that date from Plaid
    }).then(function(transaction) {
        var gteDate = moment(transaction.created_at).format("MM/DD/YY");

        return plaid.getConnectUser(token, {
            pending: true,
            gte: gteDate

        // Persist new transactions to database
        }, function(error, plaidResponse) {
            if (error) { return console.log('Plaid Error: ', error); }

            if (typeof count !== 'undefined' && count !== plaidResponse.transactions.length) {
                return console.error('Expected ' + count + ' but got ' + plaidResponse.transactions.length + ' transactions!');
            }

            // Check if new transactions exist
            if (plaidResponse.transactions.length === 0) {
                return callback({
                    status: 'unmodified',
                    message: 'No new transactions to retrieve.',
                    transactions: []
                });
            }

            return callback({
                status: 'success',
                message: 'New transactions retrieved.',
                payload: plaidResponse
            });
        });
    });
};
