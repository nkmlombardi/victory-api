var fs          = require('fs');
var path        = require('path');
var Sequelize   = require('sequelize');

module.exports = function(settings) {
    var db = {
        models: []
    };

    // Establish Datbase Connection
    var sequelize = new Sequelize(
        settings.database,
        settings.user,
        settings.password,
        settings.connection
    );

    // Read in Models & import to Sequelize
    fs.readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf('.') !== 0) && (file !== 'index.js');
        })
        .forEach(function(file) {
            var model = sequelize.import(path.join(__dirname, file));
            db.models[model.name] = model;
        });

    // Setup Model Associations
    Object.keys(db.models).forEach(function(modelName) {
        if ('associate' in db.models[modelName]) {
            db.models[modelName].associate(db);
        }
    });

    // Attach Sequelize library to database & return
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    console.log('Loaded Models: ', db.models);

    return db;
};
