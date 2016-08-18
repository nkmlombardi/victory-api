var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var simport = require('sequelize-import');

module.exports = function(settings) {
    // Create Sequelize database connection
    var database = {
        sequelize: new Sequelize(settings.name, settings.user, settings.pass, {
                host:       settings.host,
                dialect:    'postgres',
                port:       settings.port
            }
        ),
        models: {
            // Models are loaded in below
        }
    };

    // Load in database models
    database.models = simport(__dirname, database.sequelize, {
        exclude: ['index.js']
    });

    Object.keys(database.models).forEach(function(modelName) {
        if ("associate" in database.models[modelName]) {
            database.models[modelName].associate(database.models);
        }
    });

    return database;
};
