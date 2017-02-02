const Sequelize = require('sequelize')
const mysql = require('promise-mysql')
const models = require('./models')
const seeder = require('./seeders')

module.exports = () => {
    const database = {
        sequelize: new Sequelize(
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
    database.sequelize.sync({ force: true }).then(() => {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Models force synced to database.'.green)
        }

        // Seed database if in development mode
        if (process.env.NODE_ENV === 'development') {
            seeder.down(database)
            seeder.up(database)

            if (process.env.NODE_ENV !== 'test') console.log('Database Seeded.'.green)
        }
    }).catch((error) => {
        console.log('Failed to sync to database: '.red, error)
    })

    // Native MySql connection
    mysql.createConnection({
        database: process.env.MYSQL_NAME,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS
    }).then((connection) => {
        if (process.env.NODE_ENV !== 'test') console.log('Vanilla MYSQL Connection established.'.yellow)

        database.connection = connection
    })

    return database
}
