var sequelize = require('sequelize')
var models = require('./models')
var seeder = require('./seeders')

module.exports = function(settings) {
    var database = {
        /**
         * We are creating a connection to the database that is utilized by all
         * endpoints of the API.
         */
        sequelize: new sequelize(settings.name, settings.user, settings.pass, {
            host: settings.host,
            dialect: settings.type,
            port: settings.port,
            logging: false
        }),

        /**
         * When we force sync, the database rebuilds all of it's tables (models)
         * as well as their associations. Any schema changes as well as data
         * inserted into the database is lost when this is done. This should
         * only ever be done in a development environment.
         */
        doSync: (
            process.env.FORCE_SYNC_DATABASE === 'true' &&
            process.env.NODE_ENV === 'development'
        ),

        /**
         * When we seed the database, we are inserting demonstration data that
         * located in the /seeders/data directory. In order to seed the database
         * it is required that it has been force synced and wiped clean,
         * otherwise there will be injection collisions on the data. This is
         * intended to be run in a development environment, not on production.
         */
        doSeed: (
            process.env.FORCE_SYNC_DATABASE === 'true' &&
            process.env.SEED_DATABASE === 'true' &&
            process.env.NODE_ENV === 'development'
        )
    }
    
    // Import models(tables) into database
    models(database)

    // Sync models / migrations / seeds to database
    database.sequelize.sync({ force: database.doSync }).then(function() {

        // Seed database if in development mode && FORCE_SYNC_DATABASE set to true
        // We don't want to be seeding in a production environment
        if (database.doSeed) {
            seeder.down(database)
            seeder.up(database)
        }


        console.log('Models ' + (database.doSync ? 'force synced'.red : 'soft synced'.green) + ' and' + (database.doSeed ? ' seeded'.red : ' not seeded'.green) + ' to database.')
    }).catch(function(error) {
        console.log('Failed to sync to database: '.red, error)
    })

    return database
}
