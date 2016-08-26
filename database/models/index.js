var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var mysql = require('promise-mysql');
var simport = require('sequelize-import');

module.exports = function(settings) {
    // Create Sequelize database connection
    var database = {
        mysql: new Sequelize(
            settings.mysql.name,
            settings.mysql.user,
            settings.mysql.password,
            settings.mysql.connection
        ),
        postgres: new Sequelize(
            settings.postgres.name,
            settings.postgres.user,
            settings.postgres.password,
            settings.postgres.connection
        ),
        models: {
            // Models are injected below
        }
    };

    // Load in database models
    Object.assign(database.models, simport(__dirname + '/mysql', database.mysql));
    Object.assign(database.models, simport(__dirname + '/postgres', database.postgres));

    // Create relations between models by calling their associate function
    Object.keys(database.models).forEach(function(modelName) {
        if ("associate" in database.models[modelName]) {
            database.models[modelName].associate(database.models);
        }
    });

    // Establish relations
    //// Client
    database.models.client.hasMany(database.models.project,     { foreignKey: 'client_id' });

    //// Project
    database.models.project.belongsTo(database.models.client,   { foreignKey: 'client_id' });
    database.models.project.hasMany(database.models.origin,     { foreignKey: 'project_id' });

    //// Origin
    database.models.origin.belongsTo(database.models.project,   { foreignKey: 'project_id' });
    database.models.origin.hasMany(database.models.target,      { foreignKey: 'origin_id' });

    //// Target
    database.models.target.belongsTo(database.models.origin,    { foreignKey: 'origin_id' });

    // Sync Models to Postgres database
    database.postgres.sync({ force: true }).then(function() {
        console.log('Models force synced to database.');

        // Seed database if in development mode
        if (process.env.NODE_ENV === 'development') {
            var seeder = require('../seeders');
            seeder.down(database);
            seeder.up(database);

            console.log('Database Seeded.');
        }
    }).catch(function(error) {
        console.log('Failed to sync to database: ', error);
    });

    // Native MySql connection
    mysql.createConnection({
        database: settings.mysql.name,
        host: settings.mysql.connection.host,
        user: settings.mysql.user,
        password: settings.mysql.password
    }).then(function(conn) {
        console.log('Vanila MYSQL Connection connected.');
        database.connection = conn;
    });

    return database;
};
