var winston = require('winston')

module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/access_logs.json',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false
        })
    ],
    exitOnError: false
})
