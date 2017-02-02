const winston = require('winston')

module.exports = {
    errorLogger: new winston.Logger({
        transports: [
            new winston.transports.File({
                name: 'error',
                level: 'error',
                filename: './logs/error_logs.json',
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
                filename: './logs/access_logs.json',
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
