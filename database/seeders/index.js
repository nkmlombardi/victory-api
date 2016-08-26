var path = require('path');
var fs = require('fs');

// Accumulate seed files
var seeders = function() {
    var result = [];

    fs.readdirSync(__dirname).forEach(function(file) {
        /* If its the current file ignore it */
        if (file === 'index.js') return;

        /* Store module with its name (from filename) */
        result[path.basename(file, '.js')] = require(path.join(__dirname, file));
    });

    return result;
}();

module.exports = {
    up: function(database) {
        Object.keys(seeders).forEach(function(name) {
            console.log('Seeding :: ', name);

            seeders[name].up(database.sequelize, database.models);
        });
    },
    down: function(database) {
        seeders.forEach(function(seeder, index) {
            console.log('Unseeding :: ', seeders[i]);

            seeder.down(database.sequelize, database.models);
        });
    }
};
