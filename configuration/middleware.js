// Dependencies
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const handlers = require('../services/handlers')
const logger = require('../services/logger')
const limiter = require('express-rate-limit')

module.exports = (app, database) => {
    app.use(bodyParser.json())

    // Logging
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev', { stream: { write: message => logger.console.info(message) } }))
        app.use(morgan('tiny', { stream: { write: message => logger.access.info(message) } }))
    }

    // Security
    app.use(helmet())

    // Grab IP
    app.use((request, response, next) => {
        request.client_ip_addr = request.ip
        next()
    })

    // Rate Limiter
    // For login attempts
    app.use('/v1/login', limiter({
        windowMs: 1000 * 60 * 10,
        max: 5,
        delayMs: 0,
        message: 'Too many login requests made, try again later.'
    }))

    // For registering new accounts
    app.use('/v1/register', limiter({
        windowMs: 1000 * 60 * 10,
        max: 2,
        delayMs: 0,
        message: 'Too many accounts created recently, try again later'
    }))

    // For requesting endpoints
    app.use('/v1/', limiter({
        windowMs: 1000 * 60 * 10,
        max: 10,
        delayMs: 0,
        message: 'Too many endpoint requests made, try again later.'
    }))

    // Generic error logging
    app.use((error, request, response, next) => {
        logger.console.log('error', 'Application error: ', error)
    })


    // Enable CORS to avoid Cross Domain Origin issues
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        next()
    })
}
