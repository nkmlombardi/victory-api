var sequelize = require('sequelize')
var models = require('./models')
var seeder = require('./seeders')

module.exports = function(settings) {
    // Create Sequelize database connection
    var database = {
        sequelize: new sequelize(settings.name, settings.user, settings.pass, {
            host: settings.host,
            dialect: settings.type,
            port: settings.port,
            logging: false
        })
    }

    // Import models(tables) into database
    models(database)

    // Sync models / migrations / seeds to database
    database.sequelize.sync({ force: true })
        .then(function() {
            console.log('Models force synced to database.'.green)

            // Seed database if in development mode
            if (process.env.NODE_ENV === 'development') {
                seeder.down(database)
                seeder.up(database)

                console.log('Database Seeded.')
            }
        }).catch(function(error) {
            console.log('Failed to sync to database: '.red, error)
        })

    return database
}


