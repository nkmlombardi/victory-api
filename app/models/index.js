var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var mysql = require('promise-mysql');
var simport = require('sequelize-import');

module.exports = function(settings) {
    // Create Sequelize database connection
    var db = {
        sequelize: new Sequelize(
            settings.database,
            settings.user,
            settings.password,
            settings.connection
        )
    };

    // Load in database models
    db.models = simport(__dirname, db.sequelize, {
        exclude: ['index.js']
    });


    // Establish relations
    //// Client
    db.models.client.hasMany(db.models.project,     { foreignKey: 'client_id' });

    //// Project
    db.models.project.belongsTo(db.models.client,   { foreignKey: 'client_id' });
    db.models.project.hasMany(db.models.origin,     { foreignKey: 'project_id' });

    //// Origin
    db.models.origin.belongsTo(db.models.project,   { foreignKey: 'project_id' });
    db.models.origin.hasMany(db.models.target,      { foreignKey: 'origin_id' });

    //// Target
    db.models.target.belongsTo(db.models.origin,    { foreignKey: 'origin_id' });


    // Native MySql connection
    mysql.createConnection({
        database: settings.database,
        host: settings.connection.host,
        user: settings.user,
        password: settings.password

    }).then(function(conn) {
        db.connection = conn;
    });

    return db;
};
