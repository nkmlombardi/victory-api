var path            = require('path');
var express         = require('express');
var helmet          = require('helmet');
var settings        = require('./settings');
var session         = require('express-session');
var passport        = require('passport');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var database        = rootRequire('database/models')(settings);

module.exports = function(app) {
    // Parse the body of requests
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // I have no idea what this does but it was in here
    app.use(methodOverride('X-HTTP-Method-Override'));

    // Logging
    app.use(morgan('short'));

    // Security
    app.use(helmet());

    // Format Returned JSON Data
    app.set('json spaces', 4);

    // Database Middleware
    app.use(function (req, res, next) {
        req.models = database.models;
        req.connection = database.connection;
        req.sequelize = database.sequelize;
        next();
    }),

    // Enable CORS to avoid Cross Domain Origin issues
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        next();
    });

    // Use express session support since OAuth2orize requires it
    app.use(session({
        secret: 'Super Secret Session Key',
        saveUninitialized: true,
        resave: true
    }));

    // Use the passport package
    app.use(passport.initialize());
};
