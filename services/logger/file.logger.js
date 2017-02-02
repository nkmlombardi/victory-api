const winston = require('winston')

module.exports = {
    errorLogger: new winston.Logger({
        transports: [
            new winston.transports.File({
                name: 'error',
                level: 'error',
                filename: './logs/error.log',
                handleExceptions: true,
                json: false,
                maxsize: 5242880, // 5MB
                maxFiles: 5,
                colorize: false
            })
        ],
        exitOnError: false
    }),
    accessLogger: new winston.Logger({
        transports: [
            new winston.transports.File({
                name: 'access',
                level: 'info',
                filename: './logs/access.log',
                handleExceptions: true,
                json: false,
                maxsize: 5242880, // 5MB
                maxFiles: 5,
                colorize: false
            })
        ],
        exitOnError: false
    })
}
