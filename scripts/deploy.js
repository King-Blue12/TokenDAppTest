const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(ethers.utils.parseEther("1000000"));
    await token.deployed();

    const TokenSale = await hre.ethers.getContractFactory("TokenSale");
    const sale = await TokenSale.deploy(token.address);
    await sale.deployed();

    await token.transfer(sale.address, ethers.utils.parseEther("1000000"));

    console.log("Token deployed to:", token.address);
    console.log("Sale deployed to:", sale.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
