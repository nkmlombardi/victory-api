// Dependencies
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const handlers = require('../services/handlers')
const logger = require('../services/logger')

module.exports = (app, database) => {
    // Parse the body of requests
    app.use(bodyParser.json())

    // Logging
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev', { stream: { write: message => logger.console.info(message) } }))
        app.use(morgan('tiny', { stream: { write: message => logger.file.access.info(message) } }))
    }

    // Security
    app.use(helmet())

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

    // Error Handling
    app.use((request, response, next) => {
        response.handlers = handlers
        next()
    })
}
