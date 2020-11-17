/*

The following is a helper class which performs 
BFS Search Algorithm to match parents and children 
to attain the desired output format

Tech Stack:
- Javascript

Algorithm Used:
----------------------
> Breadth-First Search (BFS) Algorithm

It starts from the root node and visits all 
nodes of current depth before moving to the
next depth in the tree.

> Time complexity : O(V+E)

This is because every vertice and every edge
will be explored in the worst case, therefore
complexity depends on depth of the tree 

Author: Daniel Goncalves

 */


var algorithm_helper = function () { };
let formatted_input = []

// Function that formats the input array to a more freindly format
algorithm_helper.format_input = function (values) {
    
    // Empty the array and repopulate it
    formatted_input = [];

    // Formatting input to be easier to parse
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < values[i].length; j++) {
            formatted_input.push(values[i][j])
        }
    }
    return formatted_input
}

// Add matching children to the nodes
algorithm_helper.addChildrenToNode = function (node, cmp) {
    var currentNodeId = node.id;
    node.children = [];
    formatted_input.forEach(function (e) {
        if (e.parent_id === currentNodeId) {
            e = algorithm_helper.addChildrenToNode(e);
            node.children.push(e);
        }
    });

    // Sorting of the children nodes
    node.children = node.children.sort(cmp);

    // Return node
    return node
}

// Exporting of module
module.exports = algorithm_helper