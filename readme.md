# OneLink API
This is a global OneLink API that will be consumed by various internal and external applications.

## Getting Started
#### Installation
Navigate to the directory you wish your repository to exist in, and run the following command:

```
git clone https://github.com/onelink-translations/noc-api.git
```

Afterwards, we need to install the repository's dependencies through NPM, node's package manager:

```
npm install
```

This command iterates through the `package.json` file in the repository, and installs all defined dependencies that the API uses.

#### Running
To serve the API simply type:
```
node server.js
```

In the root directory of the repository. This will serve the application on port 3000 by default. What port the app is listening on will be printed to console, and from there you can access the various endpoints of the application.


## API Spec
#### Version 1
The first version of the API will be READ ONLY and allow for users and applications to pull metadata from
the OneLink Billboard database for consumption by the NOC Dashboard, and any future applications build both
for internal use by OneLink, and (eventually) by 3rd party developers through restricted, managed and
authenticated access to OneLink resources.
```

GET /client/                                            api.onelink.com/v1/client
    Returns all Clients.

GET /client/{id}
    RELATIONS
        HAS MANY
            /projects                                   api.onelink.com/v1/client/{id}/projects
            /origins                                    api.onelink.com/v1/client/{id}/origins
            /targets                                    api.onelink.com/v1/client/{id}/targets
            /clusters                                   api.onelink.com/v1/client/{id}/clusters
            /servers                                    api.onelink.com/v1/client/{id}/servers

-------------------------------------------------------------------------------------------------------------

GET /project/                                           api.onelink.com/v1/project
    Returns all Projects.

GET /project/{id}
    RELATIONS
        BELONGS TO ONE
            /client                                     api.onelink.com/v1/project/{id}/client

        HAS MANY
            /origins                                    api.onelink.com/v1/project/{id}/origins
            /targets                                    api.onelink.com/v1/project/{id}/targets
            /clusters                                   api.onelink.com/v1/project/{id}/clusters
            /servers                                    api.onelink.com/v1/project/{id}/servers

-------------------------------------------------------------------------------------------------------------

GET /origin/                                            api.onelink.com/v1/origin
    Returns all Origins.

GET /origin/{id}
    RELATIONS
        BELONGS TO ONE
            /project                                    api.onelink.com/v1/origin/{id}/project
            /client                                     api.onelink.com/v1/origin/{id}/client

        HAS MANY
            /targets                                    api.onelink.com/v1/origin/{id}/targets
            /clusters                                   api.onelink.com/v1/origin/{id}/clusters
            /servers                                    api.onelink.com/v1/origin/{id}/servers

-------------------------------------------------------------------------------------------------------------

GET /target/                                            api.onelink.com/v1/target
    Returns all Targets.

GET /target/{id}                                        api.onelink.com/v1/target/{id}
    RELATIONS
        BELONGS TO ONE
            /origin                                     api.onelink.com/v1/target/{id}/origin
            /project                                    api.onelink.com/v1/target/{id}/project
            /client                                     api.onelink.com/v1/target/{id}/client
            /cluster                                    api.onelink.com/v1/target/{id}/cluster
            /server                                     api.onelink.com/v1/target/{id}/server

-------------------------------------------------------------------------------------------------------------

GET /cluster/                                           api.onelink.com/v1/cluster
    Returns all Clusters.

GET /cluster/{id}                                       api.onelink.com/v1/cluster/{id}
    RELATIONS
        BELONGS TO MANY
            /targets                                    api.onelink.com/v1/cluster/{id}/targets
            /origins                                    api.onelink.com/v1/cluster/{id}/origins
            /projects                                   api.onelink.com/v1/cluster/{id}/projects
            /clients                                    api.onelink.com/v1/cluster/{id}/clients

        HAS MANY
            /servers                                    api.onelink.com/v1/cluster/{id}/servers

-------------------------------------------------------------------------------------------------------------

GET /server/                                            api.onelink.com/v1/server
    Returns all Servers.

GET /server/{id}                                        api.onelink.com/v1/server/{id}
    RELATIONS
        BELONGS TO ONE
            /cluster                                    api.onelink.com/v1/server/{id}/cluster

        HAS MANY
            /targets                                    api.onelink.com/v1/server/{id}/targets

```

