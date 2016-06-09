module.exports = {
    buildRelations: function(data, levels, resources, tree) {
        levels      = levels || Object.keys(data[0]);
        resources   = resources || levels.map(function(x) { return x.replace('_id', 's'); });
        tree        = tree || [];

        // For each data row, loop through the expected levels traversing the output tree
        data.forEach(function(d) {

            // Keep this as a reference to the current level
            var depthCursor = tree;

            // Go down one level at a time
            levels.forEach(function(property, depth) {

                // Look to see if a branch has already been created
                var index;
                depthCursor.forEach(function(child, i) {
                    if (d[property] == child[levels[depth]]) {
                        index = i;
                    }
                });

                // Add a branch if it isn't there
                if (isNaN(index)) {
                    var newResource = { [levels[depth]]: d[property] };

                    // Search through the dataset for an object that has a matching ID
                    function findResource(params) {
                        return new Promise(function(resolve, reject) {
                            // Validate injected parameters
                            if (!params.resources)  { return reject(Error('No resources parameter passed in to function.'));    }
                            if (!params.reference)  { return reject(Error('No reference parameter passed in to function.'));    }
                            if (!params.property)   { return reject(Error('No property parameter passed in to function.'));     }

                            // Iterate through resource searching for a matching ID
                            for (var i = 0; i < params.resources.length; i++) {
                                if (params.resources[i][params.property] === params.reference[params.property]) {
                                    return resolve(params.resources[i]);
                                }
                            }

                            return reject(Error('No matching resource based on property found. Invalid ID in relational map.'));
                        });
                    }

                    findResource({
                        resources:  datasets[[resources[depth]]],
                        reference:  newResource,
                        property:   levels[depth]

                    }).then(function(resource) {
                        for (var property in resource) {
                            newResource[property] = resource[property];
                        }

                    }).catch(function(error) {
                        console.log(error);
                    });

                    // Check for end of resources before adding new subtree
                    if (depth < levels.length - 1) {
                        newResource[resources[depth + 1]] = [];
                    }

                    // Push new leaf to tree
                    depthCursor.push(newResource);
                    index = depthCursor.length - 1;
                }

                // Now reference the new child array as we go deeper into the tree
                depthCursor = depthCursor[index][resources[depth + 1]];
            });
        });

        return tree;
    }
};
