var sequelize = require('sequelize')
var mysql = require('promise-mysql')
var models = require('./models')
var seeder = require('./seeders')
var winston = require('winston')

module.exports = function(settings) {
    var database = {
        sequelize: new sequelize(
            process.env.POSTGRES_NAME,
            process.env.POSTGRES_USER,
            process.env.POSTGRES_PASSWORD, {
                host: process.env.POSTGRES_HOST,
                dialect: process.env.POSTGRES_TYPE,
                port: process.env.POSTGRES_PORT,
                logging: false
            }
        )
    }

    // Import models(tables) into database
    models(database)

    // Sync models / migrations / seeds to database
    database.sequelize.sync({ force: true }).then(function() {
        if (process.env.NODE_ENV !== 'test'){
            console.log('Models force synced to database.'.green)
        }
        // Seed database if in development mode
        if (process.env.NODE_ENV === 'development') {
            seeder.down(database)
            seeder.up(database)

            if (process.env.NODE_ENV !== 'test'){
                console.log('Database Seeded.'.green)
            }
        }
    }).catch(function(error) {
        console.log('Failed to sync to database: '.red, error)
    })

    // Native MySql connection
    mysql.createConnection({
        database: settings.mysql.name,
        host: settings.mysql.connection.host,
        user: settings.mysql.user,
        password: settings.mysql.password
    }).then(function(conn) {
        if (process.env.NODE_ENV !== 'test'){
            console.log('Vanilla MYSQL Connection established.'.yellow)
        }
        database.connection = conn
    })

    return database
}
