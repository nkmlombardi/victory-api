const data = require('./data')
const logger = require('../logger')
const httpStatus = require('http-status-codes')

// Figure out how to process database errors, and application errors respectively
module.exports = (code, callback) => {
    if (process.env.NODE_ENV !== 'test') {
        switch (code) {
            /**
             * Successful Requests
             */
            case 2001:
                logger.console.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
                logger.error.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
                return callback(httpStatus.OK, {
                    status: {
                        message: data.errors[code]
                    },
                    data: []
                })
                break;


            case 2002:
                logger.console.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
                logger.error.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
                return callback(httpStatus.OK, {
                    status: {
                        message: data.errors[code]
                    },
                    data: {}
                })
                break;


            /**
             * Invalid Requests
             */
            case 4001:
                logger.console.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
                logger.error.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
                return callback(httpStatus.NOT_FOUND, {
                    status: {
                        message: data.errors[code]
                    }
                })
                break;

            case 4002:
                logger.console.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
                logger.error.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
                return callback(httpStatus.BAD_REQUEST, {
                    status: {
                        message: data.errors[code]
                    }
                })
                break;

            case 4003:
            case 4004:
            case 4006:
                logger.console.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
                logger.error.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
                return callback(httpStatus.FORBIDDEN, {
                    status: {
                        message: data.errors[code]
                    }
                })
                break;

            case 4005:
            case 4007:
                logger.console.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
                logger.error.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
                return callback(httpStatus.UNAUTHORIZED, {
                    status: {
                        message: data.errors[code]
                    }
                })
                break;


            /**
             * Internal Server Errors
             */
            case 5001:
            case 5002:
            case 5003:
            case 5004:
            case 5005:
                logger.console.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
                logger.error.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
                return callback(httpStatus.INTERNAL_SERVER_ERROR, {
                    status: {
                        message: data.errors[code]
                    }
                })
                break;


            /**
             * Registration Errors
             */
            case 6000:
            case 6001:
            case 6002:
            case 6003:
                logger.console.log('error', '\ Code:\ \ \ \ ', code, '\n\tMessage: ', data.errors[code], '\n')
                logger.error.log('error', 'Code', code, '\n\tMessage: ', data.errors[code], '\n')
                return callback(httpStatus.FORBIDDEN, {
                    status: {
                        message: data.errors[code]
                    }
                })
                break;


            /**
             * Fallback
             */
            default:
                logger.console.log('error', '\ Code:\ \ \ \ ', code.name, '\n\tMessage: ', code.message, '\n')
                logger.error.log('error', 'Code', code.name, '\n\tMessage: ', code.message, '\n')
                return callback(httpStatus.INTERNAL_SERVER_ERROR, {
                    status: {
                        name: code.name,
                        message: code.message
                    }
                })
                break;
        }
    }
}
