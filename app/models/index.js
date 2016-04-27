var Sequelize = require('sequelize');
var settings = require('../../config/settings');

var connection = null;

function setup(db, cb) {
    require('./client')(Sequelize, db);
    console.log('Setup being ran!');

    return cb(null, db);
}

module.exports = function(cb) {
    if (connection) return cb(null, connection);

    // Establish Datbase Connection
    var sequelize = new Sequelize(settings.database, settings.user, settings.password, settings.connection);
    sequelize.authenticate()
        .then(function() {
            console.log('Connection has been established successfully.');

            connection = sequelize;
            setup(sequelize, cb);
        })
        .catch(function(err) {
            console.log('Unable to connect to the database: ', err);
        })
        .done();
};
