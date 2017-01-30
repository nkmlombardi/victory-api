var internal = require('./errors')

// Figure out how to process database errors, and application errors respectively
module.exports = function(error, request, response) {
    switch (error) {
        case 4001:
            return response.status(request.status['NOT_FOUND']).json({
                status: {
                    code: error,
                    message: internal[error]
                }
            })

        case 4002:
            return response.status(request.status['BAD_REQUEST']).json({
                status: {
                    code: error,
                    message: internal[error]
                }
            })

        case 2001:
            return response.status(request.status['NOT_FOUND']).json({
                status: {
                    code: error,
                    message: internal[error]
                },
                data: []
            })

        case 4003:
            return response.status(request.status['FORBIDDEN']).json({
                status: {
                    code: error,
                    message: internal[error]
                }
            })

        case 5001:
            return response.status(request.status['INTERNAL_SERVER_ERROR']).json({
                status: {
                    code: error,
                    message: internal[error]
                }
            })

        default:
            return response.json({
                status: {
                    code: request.status['INTERNAL_SERVER_ERROR'],
                    message: 'There was an internal server error.',
                    data: error
                }
            })
    }
}
