var controllers = require('../controllers')
var services = require('../services')
var cache = require('apicache').middleware

module.exports = function(app) {


    // Base Endpoint
    app.route('/')                                              .get(function(req, res, next) { res.sendStatus(200) })

    app.route('/authenticate')                                  .post(services.authentication.isLocal, controllers.token.postToken)

    // OneLink Software
        // Client Resource
        app.route('/v1/clients')                                .get(      cache('1 hour'),    controllers.client.getClientAll)
        app.route('/v1/clients/tree')                           .get(      cache('1 hour'),    controllers.client.getClientAllTree)
        app.route('/v1/clients/:id')                            .get(      cache('1 hour'),    controllers.client.getClient)
        // app.route('/v1/clients/:id/tree')                       .get(      cache('1 hour'),    controllers.client.getClientTree)

            //// One to Many Relationships
            app.route('/v1/clients/:id/projects')               .get(      cache('1 hour'),    controllers.client.getClientProjects)
            app.route('/v1/clients/:id/origins')                .get(      cache('1 hour'),    controllers.client.getClientOrigins)
            app.route('/v1/clients/:id/targets')                .get(      cache('1 hour'),    controllers.client.getClientTargets)
            // app.route('/v1/clients/:id/servers')                .get(      cache('1 hour'),    controllers.client.getClientServers)
            app.route('/v1/clients/:id/clusters')               .get(      cache('1 hour'),    controllers.client.getClientClusters)
            app.route('/v1/clients/:id/datacenters')            .get(      cache('1 hour'),    controllers.client.getClientDatacenters)


        // // Project Resource
        // app.route('/v1/projects')                               .get(      cache('1 hour'),    controllers.project.getProjectAll)
        // app.route('/v1/projects/tree')                          .get(      cache('1 hour'),    controllers.project.getProjectAllTree)
        // app.route('/v1/projects/:id/')                          .get(      cache('1 hour'),    controllers.project.getProject)
        // app.route('/v1/projects/:id/tree')                      .get(      cache('1 hour'),    controllers.project.getProjectTree)

        //     //// One to One Relationships
        //     app.route('/v1/projects/:id/client')                .get(      cache('1 hour'),    controllers.project.getProjectClient)

        //     //// One to Many Relationships
        //     app.route('/v1/projects/:id/origins')               .get(      cache('1 hour'),    controllers.project.getProjectOrigins)
        //     app.route('/v1/projects/:id/targets')               .get(      cache('1 hour'),    controllers.project.getProjectTargets)
        //     // app.route('/v1/projects/:id/servers')                .get(      cache('1 hour'),    controllers.project.getProjectServers)
        //     app.route('/v1/projects/:id/clusters')              .get(      cache('1 hour'),    controllers.project.getProjectClusters)
        //     app.route('/v1/projects/:id/datacenters')           .get(      cache('1 hour'),    controllers.project.getProjectDatacenters)


        // // Origin Resource
        // app.route('/v1/origins')                                .get(      cache('1 hour'),    controllers.origin.getOriginAll)
        // app.route('/v1/origins/tree')                           .get(      cache('1 hour'),    controllers.origin.getOriginAllTree)
        // app.route('/v1/origins/:id/')                           .get(      cache('1 hour'),    controllers.origin.getOrigin)
        // app.route('/v1/origins/:id/tree')                       .get(      cache('1 hour'),    controllers.origin.getOriginTree)

        //     //// One to One Relationships
        //     app.route('/v1/origins/:id/client')                 .get(      cache('1 hour'),    controllers.origin.getOriginClient)
        //     app.route('/v1/origins/:id/project')                .get(      cache('1 hour'),    controllers.origin.getOriginProject)

        //     //// One to Many Relationships
        //     app.route('/v1/origins/:id/targets')                .get(      cache('1 hour'),    controllers.origin.getOriginTargets)
        //     // app.route('/v1/origins/:id/servers')                .get(      cache('1 hour'),    controllers.origin.getOriginServers)
        //     app.route('/v1/origins/:id/clusters')               .get(      cache('1 hour'),    controllers.origin.getOriginClusters)
        //     app.route('/v1/origins/:id/datacenters')            .get(      cache('1 hour'),    controllers.origin.getOriginDatacenters)


        // // Target Resource
        // app.route('/v1/targets')                                .get(      cache('1 hour'),    controllers.target.getTargets)
        // app.route('/v1/targets/:id/')                           .get(      cache('1 hour'),    controllers.target.getTarget)

        //     //// One to One Relationships
        //     app.route('/v1/targets/:id/client')                 .get(      cache('1 hour'),    controllers.target.getTargetClient)
        //     app.route('/v1/targets/:id/project')                .get(      cache('1 hour'),    controllers.target.getTargetProject)
        //     app.route('/v1/targets/:id/origin')                 .get(      cache('1 hour'),    controllers.target.getTargetOrigin)

        //     //// One to Many Relationships
        //     // app.route('/v1/targets/:id/servers')                .get(controllers.auth.isAuthenticated,      cache('1 hour'),    controllers.target.getTargetServers)
        //     app.route('/v1/targets/:id/clusters')               .get(      cache('1 hour'),    controllers.target.getTargetClusters)
        //     app.route('/v1/targets/:id/datacenters')            .get(      cache('1 hour'),    controllers.target.getTargetDatacenters)


    // OneLink Infrastructure
        // Datacenter Resource
        app.route('/v1/datacenters')                            .get(      cache('1 hour'),    controllers.datacenter.getDatacenters)
        app.route('/v1/datacenters/tree')                       .get(      cache('1 hour'),    controllers.datacenter.getDatacentersTree)
        app.route('/v1/datacenters/:id/')                       .get(      cache('1 hour'),    controllers.datacenter.getDatacenter)

            //// One to Many Relationships
            app.route('/v1/datacenters/:id/clients')            .get(      cache('1 hour'),    controllers.datacenter.getDatacenterClients)
            app.route('/v1/datacenters/:id/projects')           .get(      cache('1 hour'),    controllers.datacenter.getDatacenterProjects)
            app.route('/v1/datacenters/:id/origins')            .get(      cache('1 hour'),    controllers.datacenter.getDatacenterOrigins)
            app.route('/v1/datacenters/:id/targets')            .get(      cache('1 hour'),    controllers.datacenter.getDatacenterTargets)
            app.route('/v1/datacenters/:id/servers')            .get(      cache('1 hour'),    controllers.datacenter.getDatacenterServers)
            app.route('/v1/datacenters/:id/clusters')           .get(      cache('1 hour'),    controllers.datacenter.getDatacenterClusters)


        // Cluster Resource
        app.route('/v1/clusters')                               .get(      cache('1 hour'),    controllers.cluster.getClusters)
        app.route('/v1/clusters/tree')                          .get(      cache('1 hour'),    controllers.cluster.getClustersTree)
        app.route('/v1/clusters/:id/')                          .get(      cache('1 hour'),    controllers.cluster.getCluster)

            //// One to One Relationships
            app.route('/v1/clusters/:id/datacenter')            .get(      cache('1 hour'),    controllers.cluster.getClusterDatacenter)

            //// One to Many Relationships
            app.route('/v1/clusters/:id/clients')               .get(      cache('1 hour'),    controllers.cluster.getClusterClients)
            app.route('/v1/clusters/:id/projects')              .get(      cache('1 hour'),    controllers.cluster.getClusterProjects)
            app.route('/v1/clusters/:id/origins')               .get(      cache('1 hour'),    controllers.cluster.getClusterOrigins)
            app.route('/v1/clusters/:id/targets')               .get(      cache('1 hour'),    controllers.cluster.getClusterTargets)
            app.route('/v1/clusters/:id/servers')               .get(      cache('1 hour'),    controllers.cluster.getClusterServers)


        // Server Resource
        // app.route('/v1/servers')                                .get(      cache('1 hour'),    controllers.server.getServers)
        // app.route('/v1/servers/:id/')                           .get(      cache('1 hour'),    controllers.server.getServer)

        //     //// One to One Relationships
        //     app.route('/v1/servers/:id/datacenter')             .get(      cache('1 hour'),    controllers.server.getServerDatacenter)
        //     app.route('/v1/servers/:id/cluster')                .get(      cache('1 hour'),    controllers.server.getServerCluster)

        //     //// One to Many Relationships
        //     app.route('/v1/servers/:id/clients')                .get(      cache('1 hour'),    controllers.server.getServerClients)
        //     app.route('/v1/servers/:id/projects')               .get(      cache('1 hour'),    controllers.server.getServerProjects)
        //     app.route('/v1/servers/:id/origins')                .get(      cache('1 hour'),    controllers.server.getServerOrigins)
        //     app.route('/v1/servers/:id/targets')                .get(      cache('1 hour'),    controllers.server.getServerTargets)


        // User Resource
        // app.route('/v1/users')                                      .get(       cache('1 hour'),      controllers.user.getUsers)
        // app.route('/v1/users/:id')                                 .get(       cache('1 hour'),      controllers.user.getUser)

        // app.route('/v1/users')                                      .post(       cache('1 hour'),      controllers.user.postUser)
        // app.route('/v1/users/:id')                                 .patch(       cache('1 hour'),      controllers.user.patchUser)
        // app.route('/v1/users/:id')                                 .delete(       cache('1 hour'),      controllers.user.deleteUser)
}
