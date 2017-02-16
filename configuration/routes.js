const controllers = require('../controllers')
const services = require('../services')
const cache = require('apicache').middleware
const passport = require('passport')

module.exports = (app) => {
    console.time('routes File')

    // Base Endpoint
    app.route('/')
        .get((request, response) => { response.sendStatus(200) })
    app.route('/v1/authenticate')
        .post(services.authentication.isLocal, controllers.authentication.postSelfPassport)
    /*
        OneLink Software
     */
    // Client Resource
    app.route('/v1/clients')
        .get(services.authentication.isJwt, controllers.client.getClients)
    app.route('/v1/clients/:id')
        .get(cache('1 hour'), controllers.client.getClient)
    app.route('/v1/clients/:id/origins')
        .get(cache('1 hour'), controllers.client.getClientOrigins)

    // Origin Resource
    app.route('/v1/origins')
        .get(services.authentication.isJwt, controllers.origin.getOrigins)
    app.route('/v1/origins/:id/')
        .get(cache('1 hour'), controllers.origin.getOrigin)
    app.route('/v1/origins/:id/targets')
        .get(controllers.origin.getOriginTargets)
    app.route('/v1/origins/:id/health')
        .get(controllers.origin.getOriginHealthLog)

    // Target Resource
    app.route('/v1/targets')
        .get(cache('1 hour'), controllers.target.getTargets)
    app.route('/v1/targets/:id/')
        .get(cache('1 hour'), controllers.target.getTarget)


    /*
        Onelink Infrastructure
     */

    // Datacenter Resource
    app.route('/v1/datacenters')
        .get(cache('1 hour'), controllers.datacenter.getDatacenters)
    app.route('/v1/datacenters/:id')
        .get(cache('1 hour'), controllers.datacenter.getDatacenter)

    //     One to Many Relationships
    app.route('/v1/datacenters/:id/clusters')
        .get(cache('1 hour'), controllers.datacenter.getDatacenterClusters)

    // Cluster Resource
    app.route('/v1/clusters')
        .get(cache('1 hour'), controllers.cluster.getClusters)
    app.route('/v1/clusters/:id')
        .get(cache('1 hour'), controllers.cluster.getCluster)
    console.timeEnd('routes File')
}
