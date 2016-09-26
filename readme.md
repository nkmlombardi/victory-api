# Victory Financial Platform API
This is a global Victory API that will be consumed by various internal and eventually external applications. The API pulls it's financial information from a service called Plaid.

## Getting Started
#### Installation
Navigate to the directory you wish your repository to exist in, and run the following command:

```
git clone https://github.com/nkmlombardi/victory-api.git
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
