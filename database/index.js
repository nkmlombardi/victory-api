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

    // If we are in a development environment and FORCE_SYNC_DATABASE is set to true, then force sync
    // We don't want to be seeding or force syncing in a production environment, like ever. That's bad.
    var forceSyncSeed = process.env.FORCE_SYNC_DATABASE === 'true' && process.env.NODE_ENV === 'development'

    console.log('forceSyncSeed: '.blue, forceSyncSeed)

    // Import models(tables) into database
    models(database)

    // Sync models / migrations / seeds to database
    database.sequelize.sync({ force: forceSyncSeed }).then(function() {
        console.log('Models ' + (forceSyncSeed ? 'force '.red : '') + 'synced'.green + ' to database.')

        // Seed database if in development mode && FORCE_SYNC_DATABASE set to true
        // We don't want to be seeding in a production environment
        if (forceSyncSeed) {
            seeder.down(database)
            seeder.up(database)

            console.log('Database Seeded.')
        }
    }).catch(function(error) {
        console.log('Failed to sync to database: '.red, error)
    })

    return database
}
