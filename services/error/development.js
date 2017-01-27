var internal = require('./errors')

// Figure out how to process database errors, and application errors respectively
module.exports = function(error, request, response, next) {
    switch (error) {
        case 1000:
            return response.json({
                status: request.status['NOT_FOUND'],
                message: internal[error]
            })

        case 1001:
            return response.json({
                status: request.status['BAD_REQUEST'],
                message: internal[error]
            })

        default:
            return response.json({
                status: request.status['INTERNAL_SERVER_ERROR'],
                message: 'There was an internal server error.',
                data: error
            })
    }
    next()
}
