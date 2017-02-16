const internal = require('./data/errors')
const errorLogger = require('../logger/file.logger').errorLogger

// Figure out how to process database errors, and application errors respectively
module.exports = (error, request, response) => {
    switch (error) {
        // Successful responses
    case 2001:
        return response.status(request.status.OK).json({
            status: {
                code: error,
                message: internal[error]
            },
            data: []
        })

    case 2002:
        return response.status(request.status.OK).json({
            status: {
                code: error,
                message: internal[error]
            },
            data: {}
        })

    // Invalid requests
    case 4001:
        return response.status(request.status.NOT_FOUND).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 4002:
        return response.status(request.status.BAD_REQUEST).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 4003:
        return response.status(request.status.FORBIDDEN).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 4004:
        return response.status(request.status.FORBIDDEN).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 4005:
        return response.status(request.status.UNAUTHORIZED).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 4006:
        return response.status(request.status.FORBIDDEN).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 4007:
        return response.status(request.status.UNAUTHORIZED).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 4008:
        return response.status(request.status.UNAUTHORIZED).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 4009:
        return response.status(request.status.UNAUTHORIZED).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 4010:
        return response.status(request.status.UNAUTHORIZED).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    // Internal server errors
    case 5001:
    errorLogger.log('error', '\n\tCode ' + error + '\n\t\tMessage: ' + internal[error])
        return response.status(request.status.INTERNAL_SERVER_ERROR).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 5002:
    errorLogger.log('error', '\n\tCode ' + error + '\n\t\tMessage: ' + internal[error])
        return response.status(request.status.INTERNAL_SERVER_ERROR).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 5003:
    errorLogger.log('error', '\n\tCode ' + error + '\n\t\tMessage: ' + internal[error])
        return response.status(request.status.INTERNAL_SERVER_ERROR).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 5004:
    errorLogger.log('error', '\n\tCode ' + error + '\n\t\tMessage: ' + internal[error])
        return response.json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    case 5005:
    errorLogger.log('error', '\n\tCode ' + error + '\n\t\tMessage: ' + internal[error])
        return response.status(request.status.INTERNAL_SERVER_ERROR).json({
            status: {
                code: error,
                message: internal[error]
            }
        })

    // Default case
    default:
    errorLogger.log('error', '\n\t' + request.status.INTERNAL_SERVER_ERROR + '\n\t\tMessage: ' + 'There was an internal server error.' + '\n\t\t\t Data: ' + error)
        return response.json({
            status: {
                code: request.status.INTERNAL_SERVER_ERROR,
                message: error.message,
                data: error
            }
        })
    }
}
