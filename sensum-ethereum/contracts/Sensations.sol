//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Sensations {

    struct sensation {
        string author;
        string message;
    }

    sensation[] public sensations;
    event Synapsis(sensation _sensation, uint256 _index);

    constructor() {
        console.log("Deploying Sensations contract uWu");
    }

    function getSensationsLength() public view returns (uint256) {
        return sensations.length;
    }

    // FIXME:
    // Unserializing struct returns values separated by comma
    // It doesn't work with commas inside msg or authors.
    // function getSensations() public view returns (sensation[] memory) {
    //     return sensations;
    // }

    // TODO:
    // Check for author and message lengths.
    // Sanitize input. base64 could be an option to avoid above error as well.
    function newSensation(sensation memory _sensation) public {
        console.log("Generating new sensation: '%s', '%s'", _sensation.author, _sensation.message);
        sensations.push(_sensation);
        emit Synapsis(_sensation, sensations.length - 1);
    }

}