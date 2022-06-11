const { expect } = require("chai");
const { ethers } = require("hardhat");
const legacySensations = require("./legacy-sensations.json");

const checkSensation = async (contract, sensation, expectedLength) => {
  const tx = await contract.newSensation(sensation);
  const receipt = await tx.wait();
  const eventArgs = receipt.events.find(({ event }) => event === "Synapsis")
    .args[0];

  expect(await contract.getSensationsLength()).to.equal(expectedLength);
  expect(eventArgs[1]).to.equal(sensation.message);
  expect(parseInt(eventArgs[0]._hex, 16)).to.equal(sensation.avatar);
};

describe("sensations contract test suite", function () {
  let Sensations;
  let sensations;
  beforeEach(async function () {
    Sensations = await ethers.getContractFactory("Sensations");
    sensations = await Sensations.deploy();
  });
  it("Should have 0 sensations in the begining", async () =>
    expect(await sensations.getSensationsLength()).to.equal(0));
  it("Should be able to send a sensation", () =>
    checkSensation(sensations, { avatar: 0, message: "M o n i" }, 1));
  it("Should be able to handle all the legacy sensations", async function () {
    this.timeout(0); // will take a while
    for (let i = 0; i < legacySensations.length; i++)
      await checkSensation(sensations, legacySensations[i], i + 1);
  });
});
