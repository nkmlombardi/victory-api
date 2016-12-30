// Dependencies
var helmet = require('helmet')
var morgan = require('morgan')
var bodyParser = require('body-parser')

module.exports = function(app, database) {

    // Parse the body of requests
    app.use(bodyParser.json())

    // Logging
    app.use(morgan('short'))

    // Security
    app.use(helmet())

    // Error Handling
    app.use(function(req, res, next) {
        req.status = {
            success: 'success',
            error: 'error'
        }
        next()
    })

    // Database Middleware
    app.use(function(req, res, next) {
        req.models = database.models
        req.connection = database.connection
        next()
    })

    // Enable CORS to avoid Cross Domain Origin issues
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        next()
    })
}
