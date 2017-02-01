let simport = require('sequelize-import')

module.exports = (database) => {
    // Load in database models
    database.models = simport(__dirname, database.sequelize, {
        exclude: ['index.js']
    })

    Object.keys(database.models).forEach((modelName) => {
        if ('associate' in database.models[modelName]) {
            database.models[modelName].associate(database.models)
            console.log(`${modelName}relations linked.`)
        }
    })
}
