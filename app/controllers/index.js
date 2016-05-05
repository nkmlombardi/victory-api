module.exports = {
    // OneLink Software
    client:     require('./client'),
    project:    require('./project'),
    origin:     require('./origin'),
    target:     require('./target'),

    // OneLink Infrastructure
    datacenter: require('./datacenter'),
    cluster:    require('./cluster'),

    // Authentication
    auth: require('./authentication')
};
