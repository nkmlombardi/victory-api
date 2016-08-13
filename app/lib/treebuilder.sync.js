module.exports = {
    build: function(data, datasets, levels, resources, tree) {
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
                    var resource = function(resources, reference, attribute) {
                        for (var i = 0; i < resources.length; i++) {
                            if (resources[i][attribute] === reference[attribute]) {
                                return resources[i];
                            }
                        }

                        return false;
                    }(datasets[[resources[depth]]], newResource, levels[depth]);

                    // Copy properties to the tree object we are iterating on
                    if (resource) {
                        for (var property in resource) {
                            newResource[property] = resource[property];
                        }
                    } else {

                    }

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
