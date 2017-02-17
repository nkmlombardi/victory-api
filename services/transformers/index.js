module.exports = {
    // Serverside
    datacenters: require('./datacenter'),
    clusters: require('./cluster'),

    // Clientside
    clients: require('./client'),
    origins: require('./origin'),
    targets: require('./target')
}
