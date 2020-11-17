/*

The following is an API controller which interacts
with the algorithm helper service to process the input 
array into the desired output

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

// Importing custom helper services
const algorithm_helper = require('../services/algorithm_helper');
const validation_helper = require('../services/validation_helper');

const match_children = async (req, h) => {

    // Requesting payload data and inititializing it to a variable
    let request_body = req.payload;

    // Verifying weather JSON is valid or not
    let is_json_valid = await validation_helper.is_valid_json(request_body);

    if (is_json_valid) {

        // Retreiving values from parent object array
        let values = Object.values(request_body)

        // Convert the format of input into a more data freindly format
        let formatted_input = algorithm_helper.format_input(values);

        // Declare the resultant array
        let resultant = []

        // Iterating over nodes in input array to identify the trees
        formatted_input.forEach(node => {
            if (node.parent_id == null) {
                // Create a new tree since node does not have parent
                let tree = node
                // Marking visited nodes
                var cmp = function (a, b) {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                };
                // Adding children to the tree
                tree = algorithm_helper.addChildrenToNode(tree, cmp);
                // Push value to resultant array
                resultant.push(tree)
            }
        });

        // Returning of modified tree
        return resultant

    } else {

        // Errored response in the case that JSON is invalid
        let response_err = {
            "statusCode": 500,
            "error": "JSON Invalid",
            "message": "Please ensure your request contains valid JSON"
        }

        // Return error message
        return response_err
    }
};

// Exporting of module
module.exports = {
    match_children_handler: match_children
}