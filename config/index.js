module.exports = function() {

    var environment = {
        // production: {
        //     middleware:     require('./production/middleware'),
        //     settings:       require('./production/settings')
        // },
        development: {
            middleware:     require('./development/middleware'),
            settings:       require('./development/settings')
        },
        // testing: {
        //     middleware:     require('./testing/middleware'),
        //     settings:       require('./testing/settings')
        // },
        // local: {
        //     middleware:     require('./local/middleware'),
        //     settings:       require('./local/settings')
        // }
    }

    return environment[process.env.NODE_ENV]
}
