const Sequelize = require('sequelize')
const models = require('./models')
const seeder = require('./seeders')
const chalk = require('chalk')
const Promise = require('bluebird')

module.exports = {
    /**
     * Sets up the Seqelize & MySQL databases, imports and links their relations
     * @return {object} instantiated database objects
     */
    connect() {
        this.state.sequelize = new Sequelize(
            process.env.DATABASE_NAME,
            process.env.DATABASE_USER,
            process.env.DATABASE_PASSWORD, {
                host: process.env.DATABASE_HOST,
                dialect: process.env.DATABASE_TYPE,
                port: process.env.DATABASE_PORT,
                logging: false
            }
        )

        // Import models(tables) into database
        console.log(`${chalk.yellow('Importing')} models into database`)
        models(this.state)

        // Sync models / migrations / seeds to database
        this.state.sequelize.sync({ force: this.state.doSync })
            .then(() => console.log(`Database ${(this.state.doSync ? chalk.red('force synced') : chalk.green('soft synced'))}`))
            .then(() => {
                // Seed database if in development mode && FORCE_SYNC_DATABASE set to true
                // We don't want to be seeding in a production environment
                if (this.state.doSeed) {
                    seeder.down(this.state).then(() => {
                        console.log(`Database ${chalk.red('de-seeded')} and wiped clean`)

                        console.log('--------------------------------')
                        seeder.up(this.state).then(() => {
                            console.log('--------------------------------')
                            console.log(`Database ${chalk.red('seeded')} with example data`)
                        })
                    })
                }
            })
            .catch((error) => {
                console.log(chalk.red('Failed to sync to database: '), error)
            })

        return this.state
    },


    /**
     * Instatiated database objects
     * @type {Object}
     */
    state: {
        sequelize: null,
        models: null,

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
    },


    /**
     * Terminates the connection to both databases
     */
    disconnect() {
        if (this.state.sequelize !== null) this.state.sequelize = null
    }
}
