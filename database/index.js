const Sequelize = require('sequelize')
const mysql = require('promise-mysql')
const models = require('./models')
const seeder = require('./seeders')
const colors = require('colors')

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
            console.log(colors.green('Models'), 'force synced to database.')
        }

        // Seed database if in development mode
        if (process.env.NODE_ENV === 'development') {
            seeder.down(database)
            seeder.up(database)

            if (process.env.NODE_ENV !== 'test') console.log(colors.green('Database'), 'Seeded.')
        }
    }).catch((error) => {
        console.log(colors.red('Failed to sync to database: '), error)
    })

    // Native MySql connection
    mysql.createConnection({
        database: process.env.MYSQL_NAME,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS
    }).then((connection) => {
        if (process.env.NODE_ENV !== 'test') console.log(colors.yellow('Vanilla MYSQL Connection'), 'established.')

        database.connection = connection
    })

    return database
}
