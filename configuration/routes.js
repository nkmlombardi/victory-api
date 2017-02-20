const controllers = require('../controllers')
const cache = require('apicache').middleware
const authentication = require('../services/authentication')
const handlers = require('../services/handlers')

module.exports = (app) => {

    /**
     * Fallbacks
     */
    app.route('/')
        .get((request, response) => { response.sendStatus(200) })


    /**
     * Authentication
     */
    app.route('/v1/authenticate')
        .post(authentication.isLocal, controllers.authentication.postSelfPassport)


    /**
     * Clients
     */
    app.route('/v1/clients')
        .get(handlers.controller(controllers.client.getCollection))
    app.route('/v1/clients/:id')
       .get(handlers.controller(controllers.client.getSingleton, (request) => [request.params.id]))
    app.route('/v1/clients/:id/origins')
        .get(cache('1 hour'), controllers.client.getOrigins)


    /**
     * Origins
     */
    app.route('/v1/origins')
        .get(cache('1 hour'), controllers.origin.findAll)
    app.route('/v1/origins/:id/')
        .get(cache('1 hour'), controllers.origin.find)
    app.route('/v1/origins/:id/targets')
        .get(cache('1 hour'), controllers.origin.getTargets)
    app.route('/v1/origins/:id/health')
        .get(controllers.origin.getHealthHistory)
    app.route('/v1/origins/:id/dispatch')
        .get(controllers.origin.getDispatchHistory)


    /**
     * Targets
     */
    app.route('/v1/targets')
        .get(cache('1 hour'), controllers.target.findAll)
    app.route('/v1/targets/:id/')
        .get(cache('1 hour'), controllers.target.find)


    /**
     * Datacenters
     */
    app.route('/v1/datacenters')
        .get(cache('1 hour'), controllers.datacenter.findAll)
    app.route('/v1/datacenters/:id')
        .get(cache('1 hour'), controllers.datacenter.find)
    app.route('/v1/datacenters/:id/clusters')
        .get(cache('1 hour'), controllers.datacenter.getClusters)


    /**
     * Clusters
     */
    app.route('/v1/clusters')
        .get(cache('1 hour'), controllers.cluster.findAll)
    app.route('/v1/clusters/:id')
        .get(cache('1 hour'), controllers.cluster.find)

}
