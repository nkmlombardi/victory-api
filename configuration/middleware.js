// Dependencies
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const httpStatus = require('http-status-codes')
const handlers = require('../services/handlers')
const consoleLogger = require('../services/logger/console.logger')
const fileLogger = require('../services/logger/file.logger').accessLogger
const expressJwt = require('express-jwt')
const secret = require('../services/authentication/.secret.key').secretKey



module.exports = (app, database) => {
    // Parse the body of requests
    app.use(bodyParser.json())

    // Logging
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev', {
            stream: { write: message => consoleLogger.info(message) } }
        ))
        app.use(morgan('tiny', {
            stream: { write: message => fileLogger.info(message) } }
        ))
    }

    // Security
    app.use(helmet())

    // Http status codes for request objects
    app.use((request, response, next) => {
        request.status = httpStatus
        next()
    })

    // Database Middleware
    app.use((request, response, next) => {
        request.models = database.models
        request.connection = database.connection
        next()
    })

    // Enable CORS to avoid Cross Domain Origin issues
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        next()
    })

    // JWT authentication
    // app.use((request, response, next) => {
    //     expressJwt({ secret: secret })
    //     next()
    // })

    // Error Handling
    app.use((request, response, next) => {
        response.handlers = handlers
        next()
    })

    app.use((error, request, response, next) => {
        console.error(error.stack)
        console.log("I AM HEREEEEEEEEEEEEEEEEE")
        next()
    })
}
