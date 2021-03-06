var path = require('path')
var express = require('express')
var helmet = require('helmet')
var settings = require('./settings')
var session = require('express-session')
var passport = require('passport')
var morgan = require('morgan')
var cors = require('cors')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var database = require('../../database')(settings.database)
var bluebird = require('bluebird')
var plaid = require('plaid')
var httpStatus = require('http-status')

module.exports = function(app) {
    bluebird.promisifyAll(plaid)

    // Handle unhandled promise errors
    bluebird.onPossiblyUnhandledRejection(function(error) {
        throw error
    })

    // Serve static content
    app.use(express.static(path.join(settings.path, 'public')))

    // Parse the body of requests
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())

    // I have no idea what this does but it was in here
    app.use(methodOverride('X-HTTP-Method-Override'))

    // Logging
    app.use(morgan('short'))

    // Security
    app.use(helmet())

    // Format Returned JSON Data
    app.set('json spaces', 4)

    // Error Handling
    app.use(function(req, res, next) {
        req.status = {
            success: "success",
            error: "error"
        }
        req.httpStatus = httpStatus
        next()
    })

    // Database Middleware
    app.use(function(req, res, next) {
        req.models = database.models
        next()
    })

    app.use(function(req, res, next) {
        req.plaid = new plaid.Client(
            settings.plaid.client_id,
            settings.plaid.secret_key,
            plaid.environments.tartan
        )
        req.plaid.webhook = 'http://192.168.99.100:3000/plaid/webhook/'
        next()
    })

    // Enable CORS to avoid Cross Domain Origin issues
    app.use(cors())
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
        next()
    })

    // Use the passport package
    app.use(passport.initialize())
}
