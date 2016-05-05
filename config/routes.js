var controllers = require('../app/controllers')

/*
    This file contains all of the API's resource endpoints grouped in logical order.
    Each endpoint needs to pass in an authentication method that validates the request.
 */
module.exports = function(app) {

    // Base Endpoint
    // app.route('/v1')                                         .get(controllers.home);


    // OneLink Software
        // Client Resource
        app.route('/v1/clients')                                .get(controllers.auth.isAuthenticated,      controllers.client.getClients);
        app.route('/v1/clients/:id')                            .get(controllers.auth.isAuthenticated,      controllers.client.getClient);

            //// One to Many Relationships
            app.route('/v1/clients/:id/projects')               .get(controllers.auth.isAuthenticated,      controllers.client.getClientProjects);
            app.route('/v1/clients/:id/origins')                .get(controllers.auth.isAuthenticated,      controllers.client.getClientOrigins);
            app.route('/v1/clients/:id/targets')                .get(controllers.auth.isAuthenticated,      controllers.client.getClientTargets);
            app.route('/v1/clients/:id/clusters')               .get(controllers.auth.isAuthenticated,      controllers.client.getClientClusters);
            app.route('/v1/clients/:id/datacenters')            .get(controllers.auth.isAuthenticated,      controllers.client.getClientDatacenters);


        // Project Resource
        app.route('/v1/projects')                               .get(controllers.auth.isAuthenticated,      controllers.project.getProjects);
        app.route('/v1/projects/:id/')                          .get(controllers.auth.isAuthenticated,      controllers.project.getProject);

            //// One to One Relationships
            app.route('/v1/projects/:id/client')                .get(controllers.auth.isAuthenticated,      controllers.project.getProjectClient);

            //// One to Many Relationships
            app.route('/v1/projects/:id/origins')               .get(controllers.auth.isAuthenticated,      controllers.project.getProjectOrigins);
            app.route('/v1/projects/:id/targets')               .get(controllers.auth.isAuthenticated,      controllers.project.getProjectTargets);
            app.route('/v1/projects/:id/clusters')              .get(controllers.auth.isAuthenticated,      controllers.project.getProjectClusters);
            app.route('/v1/projects/:id/datacenters')           .get(controllers.auth.isAuthenticated,      controllers.project.getProjectDatacenters);


        // Origin Resource
        app.route('/v1/origins')                                .get(controllers.auth.isAuthenticated,      controllers.origin.getOrigins);
        app.route('/v1/origins/:id/')                           .get(controllers.auth.isAuthenticated,      controllers.origin.getOrigin);

            //// One to One Relationships
            app.route('/v1/origins/:id/client')                 .get(controllers.auth.isAuthenticated,      controllers.origin.getOriginClient);
            app.route('/v1/origins/:id/project')                .get(controllers.auth.isAuthenticated,      controllers.origin.getOriginProject);

            //// One to Many Relationships
            app.route('/v1/origins/:id/targets')                .get(controllers.auth.isAuthenticated,      controllers.origin.getOriginTargets);
            app.route('/v1/origins/:id/clusters')               .get(controllers.auth.isAuthenticated,      controllers.origin.getOriginClusters);
            app.route('/v1/origins/:id/datacenters')            .get(controllers.auth.isAuthenticated,      controllers.origin.getOriginDatacenters);


        // Target Resource
        app.route('/v1/targets')                                .get(controllers.auth.isAuthenticated,      controllers.target.getTargets);
        app.route('/v1/targets/:id/')                           .get(controllers.auth.isAuthenticated,      controllers.target.getTarget);

            //// One to One Relationships
            app.route('/v1/targets/:id/client')                 .get(controllers.auth.isAuthenticated,      controllers.target.getTargetClient);
            app.route('/v1/targets/:id/project')                .get(controllers.auth.isAuthenticated,      controllers.target.getTargetProject);
            app.route('/v1/targets/:id/origin')                 .get(controllers.auth.isAuthenticated,      controllers.target.getTargetOrigin);

            //// One to Many Relationships
            app.route('/v1/targets/:id/clusters')               .get(controllers.auth.isAuthenticated,      controllers.target.getTargetClusters);
            app.route('/v1/targets/:id/datacenters')            .get(controllers.auth.isAuthenticated,      controllers.target.getTargetDatacenters);


    // OneLink Infrastructure
        // Datacenter Resource
        app.route('/v1/datacenters')                            .get(controllers.auth.isAuthenticated,      controllers.datacenter.getDatacenters);
        app.route('/v1/datacenters/:id/')                       .get(controllers.auth.isAuthenticated,      controllers.datacenter.getDatacenter);

            //// One to Many Relationships
            app.route('/v1/datacenters/:id/clients')            .get(controllers.auth.isAuthenticated,      controllers.datacenter.getDatacenterClients);
            app.route('/v1/datacenters/:id/projects')           .get(controllers.auth.isAuthenticated,      controllers.datacenter.getDatacenterProjects);
            app.route('/v1/datacenters/:id/origins')            .get(controllers.auth.isAuthenticated,      controllers.datacenter.getDatacenterOrigins);
            app.route('/v1/datacenters/:id/targets')            .get(controllers.auth.isAuthenticated,      controllers.datacenter.getDatacenterTargets);
            app.route('/v1/datacenters/:id/clusters')           .get(controllers.auth.isAuthenticated,      controllers.datacenter.getDatacenterClusters);


        // Cluster Resource
        app.route('/v1/clusters')                               .get(controllers.auth.isAuthenticated,      controllers.cluster.getClusters);
        app.route('/v1/clusters/:id/')                          .get(controllers.auth.isAuthenticated,      controllers.cluster.getCluster);

            //// One to One Relationships
            app.route('/v1/clusters/:id/datacenter')            .get(controllers.auth.isAuthenticated,      controllers.cluster.getClusterDatacenter);

            //// One to Many Relationships
            app.route('/v1/clusters/:id/clients')               .get(controllers.auth.isAuthenticated,      controllers.cluster.getClusterClients);
            app.route('/v1/clusters/:id/projects')              .get(controllers.auth.isAuthenticated,      controllers.cluster.getClusterProjects);
            app.route('/v1/clusters/:id/origins')               .get(controllers.auth.isAuthenticated,      controllers.cluster.getClusterOrigins);
            app.route('/v1/clusters/:id/targets')               .get(controllers.auth.isAuthenticated,      controllers.cluster.getClusterTargets);

};
