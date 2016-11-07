var retrieveNewTransactions = require('./retrieve')

module.exports = function(req, res, next) {
    console.log('Webhook Controller!', req.body)

    req.models.User.findOne({
        where: {
            id: req.params.id,
            access_token: req.body.access_token
        }
    }).then(function(user) {
        switch(req.body.code) {
            // Initial Transaction Webhook
            case 0:
                console.log('Initial Transaction Webhook')
                console.log(req.body)
                break


            // Historical Transaction Webhook
            case 1:
                console.log('Historical Transaction Webhook')
                console.log(req.body)
                break


            // Normal Transaction Webhook
            case 2:
                retrieveNewTransactions({
                    models: req.models,
                    plaid: req.plaid,
                    user: user,
                    token: req.body.access_token,
                    count: req.body.total_transactions
                }, function(response) {
                    if (response.status === 'error') {
                        res.status(500).json({
                            message: 'Failed to pull new transactions.'
                        })
                    }

                    if (response.status === 'success') {
                        // Inject new Transaction rows
                        req.models.PlaidTransaction.bulkCreate(
                            req.models.PlaidTransaction.fromPlaidArray(
                                response.transactions, { id: user.id }
                            )

                        // Return success && transactions
                        ).then(function(transactions) {
                            return res.status(200).json({
                                status: req.status.success,
                                message: 'New transactions persisted to database.'
                            })
                        })
                    }

                    return res.status(200).json({
                        status: req.status.success,
                        message: response.message
                    })

                    // TODO: io.socket.emit(response)
                })
                break

            // Removed Transaction Webhook
            case 3:
                console.log('Removed Transaction Webhook')
                console.log(req.body)
                break


            // User's Webhook Updated
            case 4:
                console.log('User\'s Webhook Updated')
                console.log(req.body)
                break


            // Error Response Webhook Example
            default:
                console.log('Error Response Webhook Example')
                console.log(req.body)
                break

        }
    }).error(function(error) {
        res.status(404).json({
            status: req.status.error,
            message: 'Webhook posted for user that does not exist.'
        })
    })
}
