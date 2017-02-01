const internal = require('./data/errors')

// Figure out how to process database errors, and application errors respectively
module.exports = function(error, request, response) {
    switch (error) {

        // Successful responses
        case 2001:
            return response.status(request.status['OK']).json({
                status: {
                    code: error,
                    message: internal[error]
                },
                data: []
            })

        case 2002:
            return response.status(request.status['OK']).json({
                status: {
                    code: error,
                    message: internal[error]
                },
                data: {}
            })
            break


        // Invalid requests
        case 4001:
            return response.status(request.status['NOT_FOUND']).json({
                status: {
                    code: error,
                    message: internal[error]
                }
            })
            break

        case 4002:
            return response.status(request.status['BAD_REQUEST']).json({
                status: {
                    code: error,
                    message: internal[error]
                }
            })
            break

        case 4003:
            return response.status(request.status['FORBIDDEN']).json({
                status: {
                    code: error,
                    message: internal[error]
                }
            })
            break


        // Internal server errors
        case 5001:
            return response.status(request.status['INTERNAL_SERVER_ERROR']).json({
                status: {
                    code: error,
                    message: internal[error]
                }
            })
            break

        case 5002:
            return response.status(request.status['INTERNAL_SERVER_ERROR']).json({
                status: {
                    code: error,
                    message: internal[error]
                }
            })

        case 5003:
            return response.status(request.status['INTERNAL_SERVER_ERROR']).json({
                status: {
                    code: error,
                    message: internal[error]
                }
            })

        case 5004:
        console.log("reached 5004")
            return response.json({
                status: {
                    code: error,
                    message: internal[error]
                }
            })

        case 5005:
            return response.status(request.status['INTERNAL_SERVER_ERROR']).json({
                status: {
                    code: error,
                    message: internal[error]
                }
            })

        // Default case
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
