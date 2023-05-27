import { expect } from "chai";
import { ethers } from "hardhat";
import { YourContract } from "../typechain-types";

describe("YourContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let yourContract: YourContract;
  before(async () => {
    // const [owner] = await ethers.getSigners();
    const yourContractFactory = await ethers.getContractFactory("YourContract");
    yourContract = (await yourContractFactory.deploy()) as YourContract;
    await yourContract.deployed();
  });

  describe("Deployment", function () {
    it("Should have 0 stakers", async function () {
      expect(await yourContract.getAllStakersLength()).to.equal(0);
    });

    it("Should have 1 staker after staking", async function () {
      const addys = await ethers.getSigners();
      await yourContract.connect(addys[0]).stake(60, { value: ethers.utils.parseEther("1") });
      expect(await yourContract.getAllStakersLength()).to.equal(1);
    });

    it("Should have 1 eth and 0.5 veEth locked", async function () {
      expect(await yourContract.getTotalStakedAmount()).to.equal(ethers.utils.parseEther("1"));
      expect(await yourContract.getTotalFakeEth()).to.equal(ethers.utils.parseEther(".5"));
    });

    it("Address 2 should have 1 eth and 1 veEth locked after staking", async function () {
      const addys = await ethers.getSigners();
      await yourContract.connect(addys[1]).stake(120, { value: ethers.utils.parseEther("1") });
      expect(await yourContract.getUsersStakedEth(addys[1].address)).to.equal(ethers.utils.parseEther("1"));
      expect(await yourContract.getUsersVeEth(addys[1].address)).to.equal(ethers.utils.parseEther("1"));
    });

    it("Owner should have .5 veEth", async function () {
      const [owner] = await ethers.getSigners();
      expect(await yourContract.getUsersVeEth(owner.address)).to.equal(ethers.utils.parseEther(".5"));
    });

    it("address 3 should have .5 veEth and 2 eth locked after staking", async function () {
      const addys = await ethers.getSigners();
      await yourContract.connect(addys[2]).stake(30, { value: ethers.utils.parseEther("2") });
      expect(await yourContract.getUsersStakedEth(addys[2].address)).to.equal(ethers.utils.parseEther("2"));
      expect(await yourContract.getUsersVeEth(addys[2].address)).to.equal(ethers.utils.parseEther("0.5"));
    });

    it("address 2 should have 0 eth and veEth after unstaking", async function () {
      const addys = await ethers.getSigners();
      await yourContract.connect(addys[1]).unstake(0);
      expect(await yourContract.getUsersStakedEth(addys[1].address)).to.equal(0);
      expect(await yourContract.getUsersVeEth(addys[1].address)).to.equal(0);
    });

    it("Should have .1 eth accrued fees", async function () {
      expect(await yourContract.getAccruedFees()).to.equal(ethers.utils.parseEther("0.1"));
    });

    it("Should have 0 accrued fees after distributing", async function () {
      await yourContract.distributeFees();
      expect(await yourContract.getAccruedFees()).to.equal(0);
    });

    it("Owner should have .05 eth claimable", async function () {
      const [owner] = await ethers.getSigners();
      expect(await yourContract.getClaimableRewards(owner.address)).to.equal(ethers.utils.parseEther("0.05"));
    });

    it("Owner should have 0eth claimable after claiming", async function () {
      const [owner] = await ethers.getSigners();
      await yourContract.claimFees();
      expect(await yourContract.getClaimableRewards(owner.address)).to.equal(0);
    });

    it("address 3 should have .05 eth claimable", async function () {
      const addys = await ethers.getSigners();
      expect(await yourContract.getClaimableRewards(addys[2].address)).to.equal(ethers.utils.parseEther("0.05"));
    });

    it("Should not allow another distribution (no fees to distribute)", async function () {
      await expect(yourContract.distributeFees()).to.be.revertedWith("MustHodl: no fees to distribute");
    });

    it("address 3 should have .05 eth claimable after unstaking", async function () {
      const addys = await ethers.getSigners();
      await yourContract.connect(addys[2]).unstake(0);
      expect(await yourContract.getClaimableRewards(addys[2].address)).to.equal(ethers.utils.parseEther("0.05"));
    });

    it("address 3 should have 0 eth claimable after claiming", async function () {
      const addys = await ethers.getSigners();
      await yourContract.connect(addys[2]).claimFees();
      expect(await yourContract.getClaimableRewards(addys[2].address)).to.equal(0);
    });

    it("should not allow another distribution (distribution time not reached)", async function () {
      await expect(yourContract.distributeFees()).to.be.revertedWith("MustHodl: distribution time not reached");
    });

    it("should allow distribution after 1 minute", async function () {
      await ethers.provider.send("evm_increaseTime", [60]);
      await ethers.provider.send("evm_mine", []);
      expect(await yourContract.getAccruedFees()).to.equal(ethers.utils.parseEther("0.2"));
      await yourContract.distributeFees();
      expect(await yourContract.getAccruedFees()).to.equal(0);
    });

    it("owner should have .2 eth claimable and 0 after claiming", async function () {
      const [owner] = await ethers.getSigners();
      expect(await yourContract.getClaimableRewards(owner.address)).to.equal(ethers.utils.parseEther("0.2"));
      await yourContract.claimFees();
      expect(await yourContract.getClaimableRewards(owner.address)).to.equal(0);
    });
  });
});
