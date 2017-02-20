const data = require('./data')
const fileLogger = require('../logger').file.error
const consoleLogger = require('../logger').console
const httpStatus = require('http-status-codes')

// Figure out how to process database errors, and application errors respectively
module.exports = (code, callback) => {

    switch (code) {
        /**
         * Successful Requests
         */
        case 2001:
        consoleLogger.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
        fileLogger.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
            return callback(httpStatus.OK, {
                status: {
                    message: data.errors[code]
                },
                data: []
            })


        case 2002:
        consoleLogger.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
        fileLogger.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
            return callback(httpStatus.OK, {
                status: {
                    message: data.errors[code]
                },
                data: {}
            })


        /**
         * Invalid Requests
         */
        case 4001:
        case 4002:
        consoleLogger.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
        fileLogger.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
            return callback(httpStatus.BAD_REQUEST, {
                status: {
                    message: data.errors[code]
                }
            })


        case 4003:
        case 4004:
        case 4006:
        consoleLogger.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
        fileLogger.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
            return callback(httpStatus.FORBIDDEN, {
                status: {
                    message: data.errors[code]
                }
            })


        case 4005:
        consoleLogger.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
        fileLogger.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
            return callback(httpStatus.UNAUTHORIZED, {
                status: {
                    message: data.errors[code]
                }
            })


        /**
         * Internal Server Errors
         */
        case 5001:
        case 5002:
        case 5003:
        case 5004:
        case 5005:
        consoleLogger.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
        fileLogger.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
            return callback(httpStatus.INTERNAL_SERVER_ERROR, {
                status: {
                    message: data.errors[code]
                }
            })


        /**
         * Fallback
         */
        default:
        consoleLogger.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
        fileLogger.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
            return callback(httpStatus.INTERNAL_SERVER_ERROR, {
                status: {
                    message: data.errors[code]
                }
            })
    }
}
