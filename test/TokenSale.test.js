const { expect } = require("chai");

describe("TokenSale", function () {
  it("should allow buying tokens", async function () {
    const [owner, buyer] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(ethers.utils.parseEther("1000000"));
    await token.deployed();

    const TokenSale = await ethers.getContractFactory("TokenSale");
    const sale = await TokenSale.deploy(token.address);
    await sale.deployed();

    await token.transfer(sale.address, ethers.utils.parseEther("1000000"));

    await sale.connect(buyer).buyTokens({ value: ethers.utils.parseEther("1") });
    const balance = await token.balanceOf(buyer.address);
    expect(balance).to.equal(ethers.utils.parseEther("1000"));
  });
});
