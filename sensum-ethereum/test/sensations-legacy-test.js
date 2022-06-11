const { expect } = require("chai");
const { ethers } = require("hardhat");
const legacySensations = require("./legacy-sensations.json");

describe("legacy sensations contract test suite", function () {
  let Sensations;
  let sensations;
  beforeEach(async function () {
    Sensations = await ethers.getContractFactory("Sensations");
    sensations = await Sensations.deploy();
  });
  it("Should be able to handle all the legacy sensations", async function () {
    this.timeout(0); // will take a while
    for (let i = 0; i < legacySensations.length; i++) {
      const tx = await sensations.newSensation(legacySensations[i]);
      const receipt = await tx.wait();
      const eventArgs = receipt.events.find(({ event }) => event === "Synapsis").args[0];

      expect(await sensations.getSensationsLength()).to.equal(i + 1);
      expect(eventArgs[1]).to.equal(legacySensations[i].message);
      expect(eventArgs[0]).to.equal(legacySensations[i].avatar);
    }
  });
});
