/*

The following is a helper class which validates the input JSON and ensures the 
data integrity before continuing to process the input to be come output

Tech Stack:
- Javascript

Author: Daniel Goncalves

 */

var validation_helper = function () { };

// Function that checks if payload is valid JSON
validation_helper.is_valid_json = async function (api_payload) {
    let api_payload_string = JSON.stringify(api_payload);
    try {
        JSON.parse(api_payload_string);
    } catch (e) {
        return false;
    }
    return true;
}

// Function that checks if payload matches described schema format
validation_helper.is_valid_schema = async (api_payload, result) => {

}

// Exporting of module
module.exports = validation_helper