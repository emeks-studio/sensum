//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
/**
 * @title Sensations
 * @dev Store & retrieve sensum sensations
 */
contract Sensations {

    struct sensation {
        uint256 avatar;
        string message;
    }

    sensation[] public sensations;
    event Synapsis(sensation _sensation, uint256 _index);

    constructor() {
        console.log("Deploying sensations contract uWu");
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
    // Sanitize input. base64 could be an option to avoid above error as well.
    function newSensation(sensation memory _sensation) public {
        require (bytes(_sensation.message).length <= 512, "too long sensation message");
        console.log("Generating new sensation: '%s', '%s'", _sensation.avatar, _sensation.message);
        sensations.push(_sensation);
        emit Synapsis(_sensation, sensations.length - 1);
    }

}