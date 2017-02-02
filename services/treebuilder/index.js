/**
 * Takes in a relational query, as well as the resources that are
 * to be linked together in a tree format, and zips them together.
 *
 * @param  {[type]} data      should only contain ID's
 * @param  {[type]} datasets  should contain all resources that will be referenced
 * @return {[type]}           fully linked tree
 */
module.exports = (data, datasets, levels, resources, tree) => {
    levels = levels || Object.keys(data[0])
    resources = resources || levels.map(x => x.replace('_id', 's'))
    tree = tree || []

    // For each data row, loop through the expected levels traversing the output tree
    data.forEach((d) => {
        // Keep this as a reference to the current level
        let depthCursor = tree

        // Go down one level at a time
        levels.forEach((property, depth) => {
            // Look to see if a branch has already been created
            let index
            depthCursor.forEach((child, i) => {
                if (d[property] === child[levels[depth]]) {
                    index = i
                }
            })

            // Add a branch if it isn't there
            if (isNaN(index)) {
                const newResource = { [levels[depth]]: d[property] }

                // Search through the dataset for an object that has a matching ID
                const resource = (singleResources, reference, attribute) => {
                    for (let i = 0; i < resources.length; i += 1) {
                        if (resources[i][attribute] === reference[attribute]) {
                            return resources[i]
                        }
                    }

                    return false
                }
                // (datasets[[resources[depth]]], newResource, levels[depth])

                // Copy properties to the tree object we are iterating on
                if (resource) {
                    for (const property in resource) {
                        newResource[property] = resource[property]
                    }
                }

                // Check for end of resources before adding new subtree
                if (depth < levels.length - 1) {
                    newResource[resources[depth + 1]] = []
                }

                // Push new leaf to tree
                depthCursor.push(newResource)
                index = depthCursor.length - 1
            }

            // Now reference the new child array as we go deeper into the tree
            depthCursor = depthCursor[index][resources[depth + 1]]
        })
    })

    return tree
}
