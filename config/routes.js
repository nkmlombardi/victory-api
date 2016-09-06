var settings = require('./index')().settings;
var controllers = require('../app/controllers');
var cache = require('apicache').options(settings.cache).middleware;


/*
    This file contains all of the API's resource endpoints grouped in logical order.
    Each endpoint needs to pass in an authentication method that validates the request.
 */
module.exports = function(app) {

    // Base Endpoint
    app.route('/')                                              .get(function(req, res, next) { res.sendStatus(200); });

    app.route('/authenticate')                                  .post(controllers.auth.isAuthenticated, controllers.token.postToken);

    // OneLink Software
        // Client Resource
        app.route('/v1/clients')                                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.client.getClientAll);
        app.route('/v1/clients/tree')                           .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.client.getClientAllTree);
        app.route('/v1/clients/:id')                            .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.client.getClient);
        app.route('/v1/clients/:id/tree')                       .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.client.getClientTree);

            //// One to Many Relationships
            app.route('/v1/clients/:id/projects')               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.client.getClientProjects);
            app.route('/v1/clients/:id/origins')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.client.getClientOrigins);
            app.route('/v1/clients/:id/targets')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.client.getClientTargets);
            // app.route('/v1/clients/:id/servers')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.client.getClientServers);
            app.route('/v1/clients/:id/clusters')               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.client.getClientClusters);
            app.route('/v1/clients/:id/datacenters')            .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.client.getClientDatacenters);


        // Project Resource
        app.route('/v1/projects')                               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.project.getProjectAll);
        app.route('/v1/projects/tree')                          .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.project.getProjectAllTree);
        app.route('/v1/projects/:id/')                          .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.project.getProject);
        app.route('/v1/projects/:id/tree')                      .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.project.getProjectTree);

            //// One to One Relationships
            app.route('/v1/projects/:id/client')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.project.getProjectClient);

            //// One to Many Relationships
            app.route('/v1/projects/:id/origins')               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.project.getProjectOrigins);
            app.route('/v1/projects/:id/targets')               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.project.getProjectTargets);
            // app.route('/v1/projects/:id/servers')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.project.getProjectServers);
            app.route('/v1/projects/:id/clusters')              .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.project.getProjectClusters);
            app.route('/v1/projects/:id/datacenters')           .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.project.getProjectDatacenters);


        // Origin Resource
        app.route('/v1/origins')                                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.origin.getOriginAll);
        app.route('/v1/origins/tree')                           .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.origin.getOriginAllTree);
        app.route('/v1/origins/:id/')                           .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.origin.getOrigin);
        app.route('/v1/origins/:id/tree')                       .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.origin.getOriginTree);

            //// One to One Relationships
            app.route('/v1/origins/:id/client')                 .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.origin.getOriginClient);
            app.route('/v1/origins/:id/project')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.origin.getOriginProject);

            //// One to Many Relationships
            app.route('/v1/origins/:id/targets')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.origin.getOriginTargets);
            // app.route('/v1/origins/:id/servers')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.origin.getOriginServers);
            app.route('/v1/origins/:id/clusters')               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.origin.getOriginClusters);
            app.route('/v1/origins/:id/datacenters')            .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.origin.getOriginDatacenters);


        // Target Resource
        app.route('/v1/targets')                                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.target.getTargets);
        app.route('/v1/targets/:id/')                           .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.target.getTarget);

            //// One to One Relationships
            app.route('/v1/targets/:id/client')                 .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.target.getTargetClient);
            app.route('/v1/targets/:id/project')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.target.getTargetProject);
            app.route('/v1/targets/:id/origin')                 .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.target.getTargetOrigin);

            //// One to Many Relationships
            // app.route('/v1/targets/:id/servers')                .get(controllers.auth.isAuthenticated,      cache('1 hour'),    controllers.target.getTargetServers);
            app.route('/v1/targets/:id/clusters')               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.target.getTargetClusters);
            app.route('/v1/targets/:id/datacenters')            .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.target.getTargetDatacenters);


    // OneLink Infrastructure
        // Datacenter Resource
        app.route('/v1/datacenters')                            .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.datacenter.getDatacenters);
        app.route('/v1/datacenters/tree')                       .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.datacenter.getDatacentersTree);
        app.route('/v1/datacenters/:id/')                       .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.datacenter.getDatacenter);

            //// One to Many Relationships
            app.route('/v1/datacenters/:id/clients')            .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.datacenter.getDatacenterClients);
            app.route('/v1/datacenters/:id/projects')           .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.datacenter.getDatacenterProjects);
            app.route('/v1/datacenters/:id/origins')            .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.datacenter.getDatacenterOrigins);
            app.route('/v1/datacenters/:id/targets')            .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.datacenter.getDatacenterTargets);
            app.route('/v1/datacenters/:id/servers')            .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.datacenter.getDatacenterServers);
            app.route('/v1/datacenters/:id/clusters')           .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.datacenter.getDatacenterClusters);


        // Cluster Resource
        app.route('/v1/clusters')                               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.cluster.getClusters);
        app.route('/v1/clusters/tree')                          .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.cluster.getClustersTree);
        app.route('/v1/clusters/:id/')                          .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.cluster.getCluster);

            //// One to One Relationships
            app.route('/v1/clusters/:id/datacenter')            .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.cluster.getClusterDatacenter);

            //// One to Many Relationships
            app.route('/v1/clusters/:id/clients')               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.cluster.getClusterClients);
            app.route('/v1/clusters/:id/projects')              .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.cluster.getClusterProjects);
            app.route('/v1/clusters/:id/origins')               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.cluster.getClusterOrigins);
            app.route('/v1/clusters/:id/targets')               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.cluster.getClusterTargets);
            app.route('/v1/clusters/:id/servers')               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.cluster.getClusterServers);


        // Server Resource
        app.route('/v1/servers')                                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.server.getServers);
        app.route('/v1/servers/:id/')                           .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.server.getServer);

            //// One to One Relationships
            app.route('/v1/servers/:id/datacenter')             .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.server.getServerDatacenter);
            app.route('/v1/servers/:id/cluster')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.server.getServerCluster);

            //// One to Many Relationships
            app.route('/v1/servers/:id/clients')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.server.getServerClients);
            app.route('/v1/servers/:id/projects')               .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.server.getServerProjects);
            app.route('/v1/servers/:id/origins')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.server.getServerOrigins);
            app.route('/v1/servers/:id/targets')                .get(controllers.auth.isBearerAuthenticated,      cache('1 hour'),    controllers.server.getServerTargets);

};
