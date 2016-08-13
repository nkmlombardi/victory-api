module.exports = {
    /**
     * Builds a relational tree structure based off of a flat array of unique IDs
     * pulled from a database.
     *
     * @param  {[array]}    data        flat array of IDs that denote parent and child relations
     * @param  {[array]}    indexes     resource ID's that refer to the resources
     * @param  {[array]}    resources   names of the resources
     * @param  {[array]}    tree        tree structure output by the algorithm
     * @return {[array]}                returns the tree structure that is built
     */
    link: function(data, indexes, resources, tree) {
        indexes     = indexes || Object.keys(data[0]);
        resources   = resources || indexes.map(function(x) { return x.replace('_id', 's'); });
        levels      = indexes.slice(0, -1);
        tree        = tree || []

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
                    depthCursor.push({
                        [levels[depth]]: d[property],
                        [resources[depth + 1]]: []
                    });

                    index = depthCursor.length - 1;
                }

                // Now reference the new child array as we go deeper into the tree
                depthCursor = depthCursor[index][resources[depth + 1]];

                // This is a leaf, so add the last element to the specified branch
                if (depth === levels.length - 1) {
                    depthCursor.push({
                        [indexes[depth + 1]]: d.target_id
                    });
                }
            });
        });

        return tree;
    },

    /**
     * Links a hierarchically formatted tree that is populated by ID's to their
     * external resources based on those IDs. This algorithm expects a certain
     * format to be present in the relational tree, and expects the resource to
     * be in a flat format with corresponding IDs.
     *
     * @param  {[array]}    tree        tree comprised of IDs and child trees
     * @param  {[array]}    datasets    flat file with corresponding IDs
     * @return {[array]}                fully populated tree based on linked resources
     */
    build: function f(tree, datasets) {
        // For each data row, loop through the expected levels traversing the output tree
        tree.forEach(function(data) {

            // Iterate through properties, only consider ID's
            Object.keys(data).forEach(function(key) {
                if (key.indexOf('_id') > -1) {
                    var resourceID = key.replace('_id', 's');

                    // Search through the dataset for an object that has a matching ID
                    // We are splicing from the resource array for performance gains
                    var resource = function(resources, reference, attribute) {
                        for (var i = 0; i < resources.length; i++) {
                            if (resources[i][attribute] === reference[attribute]) {
                                return resources.splice(i, 1);
                            }
                        }
                    }(datasets[resourceID], data, key)[0];

                    // Copy properties to the tree object we are iterating on
                    for (var property in resource) {
                        data[property] = resource[property];
                    }

                // If the property we are iterating on is not an ID, it must be an
                // array of objects. Therefore recursively call the function on
                // that array and repeat the linking process.
                } else {
                    f(data[key], datasets);
                }
            });
        });

        return tree;
    }
};
