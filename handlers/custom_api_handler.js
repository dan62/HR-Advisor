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
const { response } = require('express');

const match_children = async (req, h) => {

    // 1. Requesting payload data and inititializing it to a variable
    let request_body = req.payload;

    let is_json_valid = await validation_helper.is_valid_json(req.payload);

    if (is_json_valid) {

        // Retreiving values from parent object array
        const values = Object.values(request_body)

        // Convert the format of input into a more data freindly format
        let formatted_input = algorithm_helper.format_input(values);

        // Depth First TreeSort Algorithm
        let tree = formatted_input.find(o => o.parent_id === null);

        console.log(tree)

        // Marking visited nodes
        var cmp = function (a, b) {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        };

        // Adding children to the tree
        tree = algorithm_helper.addChildrenToNode(tree, cmp);

        let resultant = []
        resultant.push(tree)

        // Returning of modified tree
        return resultant
    } else {
        return {
            "statusCode": 500, "error": "JSON Invalid", "message": "Please ensure your request contains valid JSON"
        }
    }

    };

    // Exporting of module
    module.exports = {
        match_children_handler: match_children
    }