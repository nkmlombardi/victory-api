const Promise = require('bluebird')
const fs = require('fs')
const colors = require('colors')

// Accumulate seed files
const seeders = (() => fs.readdirSync(__dirname)
    .map((file) => {
        /* If its the current file ignore it */
        if (file === 'index.js') return false
        if (file === 'data') return false

        return require(`${__dirname}/${file}`) // eslint-disable-line import/no-dynamic-require
    }).filter(file => file !== false)
)()

module.exports = {
    up: database => Promise.each(
            seeders,
            (seeder, index) => seeder.up(database.sequelize, database.models)
                .catch(error => console.error(seeders[index], ' seeder error: ', error)),
            { concurrency: 1 }
        )
        .then(() => console.log(colors.green('Persisted all models successfully.')))
        .catch(error => console.error('Promise Map Error: ', error)),

    down: database => seeders.forEach(seeder => seeder.down(database.sequelize, database.models))
}
