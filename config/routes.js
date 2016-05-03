var controllers = require('../app/controllers')

/*
    This file contains all of the API's resource endpoints grouped in logical order.
 */
module.exports = function(app) {

    // Base Endpoint
    // app.route('/v1')                                         .get(controllers.home);


    // OneLink Software
        // Client Resource
        app.route('/v1/clients')                                .get(controllers.client.getClients);
        app.route('/v1/clients/:id')                            .get(controllers.client.getClient);

            //// One to Many Relationships
            app.route('/v1/clients/:id/projects')               .get(controllers.client.getClientProjects);
            app.route('/v1/clients/:id/origins')                .get(controllers.client.getClientOrigins);
            app.route('/v1/clients/:id/targets')                .get(controllers.client.getClientTargets);
            app.route('/v1/clients/:id/clusters')               .get(controllers.client.getClientClusters);
            app.route('/v1/clients/:id/datacenters')            .get(controllers.client.getClientDatacenters);

            //// Disabled
            // app.route('/v1/clients/:id/servers')             .get(controllers.client.getClientServers);

        // Project Resource
        app.route('/v1/projects')                               .get(controllers.project.getProjects);
        app.route('/v1/projects/:id/')                          .get(controllers.project.getProject);

            //// One to One Relationships
            app.route('/v1/projects/:id/client')                .get(controllers.project.getProjectClient);

            //// One to Many Relationships
            app.route('/v1/projects/:id/origins')               .get(controllers.project.getProjectOrigins);
            app.route('/v1/projects/:id/targets')               .get(controllers.project.getProjectTargets);
            app.route('/v1/projects/:id/clusters')              .get(controllers.project.getProjectClusters);
            app.route('/v1/projects/:id/datacenters')           .get(controllers.project.getProjectDatacenters);

            //// Disabled
            // app.route('/v1/projects/:id/servers')             .get(controllers.project.getProjectServers);

        // Origin Resource
        app.route('/v1/origins')                                .get(controllers.origin.getOrigins);
        app.route('/v1/origins/:id/')                           .get(controllers.origin.getOrigin);

            //// One to One Relationships
            app.route('/v1/origins/:id/client')                 .get(controllers.origin.getOriginClient);
            app.route('/v1/origins/:id/project')                .get(controllers.origin.getOriginProject);

            //// One to Many Relationships
            app.route('/v1/origins/:id/targets')                .get(controllers.origin.getOriginTargets);
            app.route('/v1/origins/:id/clusters')               .get(controllers.origin.getOriginClusters);
            app.route('/v1/origins/:id/datacenters')            .get(controllers.origin.getOriginDatacenters);


        // Target Resource
        app.route('/v1/targets')                                .get(controllers.target.getTargets);
        app.route('/v1/targets/:id/')                           .get(controllers.target.getTarget);

            //// One to One Relationships
            app.route('/v1/targets/:id/client')                 .get(controllers.target.getTargetClient);
            app.route('/v1/targets/:id/project')                .get(controllers.target.getTargetProject);
            app.route('/v1/targets/:id/origin')                 .get(controllers.target.getTargetOrigin);

            //// One to Many Relationships
            app.route('/v1/targets/:id/clusters')               .get(controllers.target.getTargetClusters);
            app.route('/v1/targets/:id/datacenters')            .get(controllers.target.getTargetDatacenters);



    // OneLink Infrastructure
        // Datacenter Resource
        app.route('/v1/datacenters')                            .get(controllers.datacenter.getDatacenters);
        app.route('/v1/datacenters/:id/')                       .get(controllers.datacenter.getDatacenter);

            //// One to Many Relationships
            app.route('/v1/datacenters/:id/clients')            .get(controllers.datacenter.getDatacenterClients);
            app.route('/v1/datacenters/:id/projects')           .get(controllers.datacenter.getDatacenterProjects);
            app.route('/v1/datacenters/:id/origins')            .get(controllers.datacenter.getDatacenterOrigins);
            app.route('/v1/datacenters/:id/targets')            .get(controllers.datacenter.getDatacenterTargets);
            app.route('/v1/datacenters/:id/clusters')           .get(controllers.datacenter.getDatacenterClusters);


        // Cluster Resource
        app.route('/v1/clusters')                               .get(controllers.cluster.getClusters);
        app.route('/v1/clusters/:id/')                          .get(controllers.cluster.getCluster);

            //// One to One Relationships
            app.route('/v1/clusters/:id/datacenter')            .get(controllers.cluster.getClusterDatacenter);

            //// One to Many Relationships
            app.route('/v1/clusters/:id/clients')               .get(controllers.cluster.getClusterClients);
            app.route('/v1/clusters/:id/projects')              .get(controllers.cluster.getClusterProjects);
            app.route('/v1/clusters/:id/origins')               .get(controllers.cluster.getClusterOrigins);
            app.route('/v1/clusters/:id/targets')               .get(controllers.cluster.getClusterTargets);

};
