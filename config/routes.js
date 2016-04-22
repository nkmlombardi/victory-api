var controllers = require('../app/controllers')

/*
    This file contains all of the API's resource endpoints grouped in logical order.
 */
module.exports = function(app) {

    // Base Endpoint
    app.route('/v1')                                        .get(controllers.home);


    // OneLink Software
        // Client Resource
        app.route('/v1/client')                             .get(controllers.client.getClients);
        app.route('/v1/client/:id')                         .get(controllers.client.getClient);

            //// One to Many Relationships
            app.route('/v1/client/:id/projects')            .get(controllers.client.getClientProjects);
            app.route('/v1/client/:id/origins')             .get(controllers.client.getClientOrigins);
            app.route('/v1/client/:id/targets')             .get(controllers.client.getClientTargets);
            app.route('/v1/client/:id/clusters')            .get(controllers.client.getClientClusters);
            app.route('/v1/client/:id/servers')             .get(controllers.client.getClientServers);


        // Project Resource
        app.route('/v1/project')                            .get(controllers.project.getProjects);
        app.route('/v1/project/:id/')                       .get(controllers.project.getProject);

            //// One to One Relationships
            app.route('/v1/project/:id/client')             .get(controllers.project.getProjectClient);

            //// One to Many Relationships
            app.route('/v1/project/:id/origins')            .get(controllers.project.getProjectOrigins);
            app.route('/v1/project/:id/targets')            .get(controllers.project.getProjectTargets);
            app.route('/v1/project/:id/clusters')           .get(controllers.project.getProjectClusters);
            app.route('/v1/project/:id/servers')            .get(controllers.project.getProjectServers);


        // Origin Resource
        // app.route('/v1/origin')                             .get(controllers.origin.getOrigins);
        // app.route('/v1/origin/{id}/')                       .get(controllers.origin.getOrigin);

            //// One to One Relationships
            // app.route('/v1/origin/{id}/client')             .get(controllers.origin.getOriginClient);
            // app.route('/v1/origin/{id}/project')            .get(controllers.origin.getOriginProject);

            //// One to Many Relationships
            // app.route('/v1/origin/{id}/targets')            .get(controllers.origin.getOriginTargets);
            // app.route('/v1/origin/{id}/clusters')           .get(controllers.origin.getOriginClusters);
            // app.route('/v1/origin/{id}/servers')            .get(controllers.origin.getOriginServers);


        // Target Resource
        // app.route('/v1/target')                             .get(controllers.target.getTargets);
        // app.route('/v1/target/{id}/')                       .get(controllers.target.getTarget);

            //// One to One Relationships
            // app.route('/v1/target/{id}/client')             .get(controllers.target.getTargetClient);
            // app.route('/v1/target/{id}/project')            .get(controllers.target.getTargetProject);
            // app.route('/v1/target/{id}/origin')             .get(controllers.target.getTargetOrigins);

            //// One to Many Relationships
            // app.route('/v1/target/{id}/clusters')           .get(controllers.target.getTargetClusters);
            // app.route('/v1/target/{id}/servers')            .get(controllers.target.getTargetServers);



    // OneLink Infrastructure
        // Datacenter Resource
        // app.route('/v1/datacenter')                         .get(controllers.datacenter.getDatacenters);
        // app.route('/v1/datacenter/{id}/')                   .get(controllers.datacenter.getDatacenter);

            //// One to Many Relationships
            // app.route('/v1/datacenter/{id}/clients')        .get(controllers.datacenter.getDatacenterClients);
            // app.route('/v1/datacenter/{id}/projects')       .get(controllers.datacenter.getDatacenterProjects);
            // app.route('/v1/datacenter/{id}/origins')        .get(controllers.datacenter.getDatacenterOrigins);
            // app.route('/v1/datacenter/{id}/targets')        .get(controllers.datacenter.getDatacenterTargets);
            // app.route('/v1/datacenter/{id}/clusters')       .get(controllers.datacenter.getDatacenterClusters);
            // app.route('/v1/datacenter/{id}/servers')        .get(controllers.datacenter.getDatacenterServers);


        // Cluster Resource
        // app.route('/v1/cluster')                            .get(controllers.cluster.getClusters);
        // app.route('/v1/cluster/{id}/')                      .get(controllers.cluster.getCluster);

            //// One to One Relationships
            // app.route('/v1/cluster/{id}/datacenter')        .get(controllers.cluster.getClusterDatacenter);

            //// One to Many Relationships
            // app.route('/v1/cluster/{id}/clients')           .get(controllers.cluster.getClusterClients);
            // app.route('/v1/cluster/{id}/projects')          .get(controllers.cluster.getClusterProjects);
            // app.route('/v1/cluster/{id}/origins')           .get(controllers.cluster.getClusterOrigins);
            // app.route('/v1/cluster/{id}/targets')           .get(controllers.cluster.getClusterTargets);
            // app.route('/v1/cluster/{id}/servers')           .get(controllers.cluster.getClusterServers);


        // Server Resource
        // app.route('/v1/server')                             .get(controllers.server.getServers);
        // app.route('/v1/server/{id}/')                       .get(controllers.server.getServer);

            //// One to One Relationships
            // app.route('/v1/server/{id}/datacenter')         .get(controllers.server.getServerDatacenter);
            // app.route('/v1/server/{id}/cluster')            .get(controllers.server.getServerCluster);

            //// One to Many Relationships
            // app.route('/v1/server/{id}/clients')            .get(controllers.server.getServerClients);
            // app.route('/v1/server/{id}/projects')           .get(controllers.server.getServerProjects);
            // app.route('/v1/server/{id}/origins')            .get(controllers.server.getServerOrigins);
            // app.route('/v1/server/{id}/targets')            .get(controllers.server.getServerTargets);




};
