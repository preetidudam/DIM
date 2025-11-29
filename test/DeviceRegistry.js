const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DeviceRegistry", function () {
  async function deployFixture() {
    const [owner, other] = await ethers.getSigners();
    const DeviceRegistry = await ethers.getContractFactory("DeviceRegistry");
    const registry = await DeviceRegistry.deploy();
    await registry.waitForDeployment();

    return { registry, owner, other };
  }

  it("registers a device and stores metadata", async function () {
    const { registry, owner } = await deployFixture();
    const name = "Weather Sensor";

    const tx = await registry.connect(owner).registerDevice(name);
    await tx.wait();
    const deviceId = ethers.solidityPackedKeccak256(["address", "string"], [
      owner.address,
      name,
    ]);

    const device = await registry.getDeviceDetails(deviceId);
    expect(device.deviceId).to.equal(deviceId);
    expect(device.name).to.equal(name);
    expect(device.owner).to.equal(owner.address);
    expect(device.timestamp).to.be.gt(0);
  });

  it("prevents duplicate registrations with same owner/name", async function () {
    const { registry } = await deployFixture();
    const name = "Thermostat";

    await registry.registerDevice(name);
    await expect(registry.registerDevice(name)).to.be.revertedWith("Device already exists");
  });

  it("allows different owners to reuse device names", async function () {
    const { registry, owner, other } = await deployFixture();
    const name = "Shared Device Name";

    await registry.connect(owner).registerDevice(name);
    await expect(registry.connect(other).registerDevice(name)).to.not.be.reverted;
  });

  it("returns ids per owner and full details for sender", async function () {
    const { registry, owner } = await deployFixture();

    const names = ["Sensor A", "Sensor B"];
    const ids = [];
    for (const n of names) {
      const tx = await registry.registerDevice(n);
      await tx.wait();
      ids.push(
        ethers.solidityPackedKeccak256(["address", "string"], [
          owner.address,
          n,
        ])
      );
    }

    const storedIds = await registry.getDevicesByOwner(owner.address);
    const normalizedIds = storedIds.map((value) => value);
    expect(normalizedIds).to.have.members(ids);

    const devices = await registry.getAllMyDevices();
    expect(devices.length).to.equal(names.length);
    expect(devices[0].name).to.be.oneOf(names);
  });
});

