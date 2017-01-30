// Dependencies
var helmet = require('helmet')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var httpStatus = require('http-status-codes')
var errorhandler = require('../services/error')[process.env.NODE_ENV]
var logger = require('../services/logger')
var express = require('express')
var errorHandlerExpress = require('../node_modules/express-error-handler')


module.exports = function(app, database) {

    // Parse the body of requests
    app.use(bodyParser.json())

    // Logging
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev', {
            stream: { write: message => logger.console.info(message) }}
        ))
        app.use(morgan('tiny', {
            stream: { write: message => logger.file.info(message) }}
        ))
    }

    // Security
    app.use(helmet())

    // Http status codes for request objects
    app.use(function(request, response, next) {
        request.status = httpStatus
        next()
    })

    // Error Handling
    app.use(function(request, response, next) {
        response.errorHandler = errorhandler
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
