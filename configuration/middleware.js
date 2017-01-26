// Dependencies
var helmet = require('helmet')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var httpStatus = require('http-status-codes')
var errorhandler = require('../services/error')[process.env.NODE_ENV]
var winston = require('winston')
var expressWinston = require('express-winston')

module.exports = function (app, database) {

    // Parse the body of requests
    app.use(bodyParser.json())

    // Logging
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'))
    }

    winston.level='debug'

    winston.info('info_test')
    winston.debug('debug_test')

    stream = {
        write: function (message, encoding) {
            logger.info(message);
        }
    }

    // Security
    app.use(helmet())

    // Error Handling
    // defining errors
    app.use(function (request, response, next) {
        request.status = httpStatus
        request.errorHandler = errorhandler
        next()
    })

    // Database Middleware
    app.use(function (request, response, next) {
        request.models = database.models
        request.connection = database.connection
        next()
    })

    // Enable CORS to avoid Cross Domain Origin issues
    app.use(function (request, response, next) {
        response.header('Access-Control-Allow-Origin', request.headers.origin)
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        next()
    })
}
