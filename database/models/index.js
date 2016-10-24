var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var simport = require('sequelize-import');

module.exports = function(settings) {
    // Create Sequelize database connection
    var database = {
        sequelize: new Sequelize(settings.name, settings.user, settings.pass, {
            host: settings.host,
            dialect: settings.type,
            port: settings.port,
            logging: false
        }),
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
            console.log(modelName + ' associations generated.');
        }
    });


    database.sequelize.sync({ force: true }).then(function() {
        console.log('Models force synced to database.');

        // Seed database if in development mode
        if (process.env.NODE_ENV === 'development') {
            var seeder = require('../seeders');
            seeder.down(database);
            seeder.up(database);

            console.log('Database Seeded.')
        }
    }).catch(function(error) {
        console.log('Failed to sync to database: ', error);
    });

    return database;
};
