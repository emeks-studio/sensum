const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Sensum", function () {
  let Sensations;
  let sensations;
  beforeEach(async function () {
    Sensations = await ethers.getContractFactory("Sensations");
    sensations = await Sensations.deploy();
  });
  it("Should have 0 sensations in the begining", async () =>
    expect(await sensations.getSensationsLength()).to.equal(0));
  it("Should be able to send a sensation", async function () {
    const sensation = { avatar: 0, message: "M o n i" };
    const tx = await sensations.newSensation(sensation);
    const receipt = await tx.wait();
    const eventArgs = receipt.events.find(({ event }) => event === "Synapsis")
      .args[0];

    expect(await sensations.getSensationsLength()).to.equal(1);
    expect(eventArgs[1]).to.equal(sensation.message);
    expect(parseInt(eventArgs[0]._hex, 16)).to.equal(sensation.avatar);
  });
});
