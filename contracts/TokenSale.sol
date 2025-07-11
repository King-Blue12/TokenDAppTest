
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MyToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSale is Ownable {
    MyToken public token;
    uint256 public rate = 1000; // 1 ETH = 1000 tokens
    uint256 public totalRaised;
    bool public isPaused = false;

    constructor(MyToken _token) {
        token = _token;
    }

    receive() external payable {
        buyTokens();
    }

    function buyTokens() public payable {
        require(!isPaused, "Sale is paused");
        uint256 tokenAmount = msg.value * rate;
        require(token.balanceOf(address(this)) >= tokenAmount, "Not enough tokens");
        token.transfer(msg.sender, tokenAmount);
        totalRaised += msg.value;
    }

    function pause() public onlyOwner {
        isPaused = true;
    }

    function unpause() public onlyOwner {
        isPaused = false;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
