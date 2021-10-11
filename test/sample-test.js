const { expect } = require("chai");
const { ethers } = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();
const customURL = process.env.INFURA_URL;
const NFT_OWNER = process.env.NFT_OWNER;
const ENS_CONTRACT = process.env.ENS_CONTRACT;
const ENS_NFT_TOKEN_ID = process.env.ENS_NFT_TOKEN_ID;
const WETH = process.env.WETH;

describe("NFT Market Tests", function () {

  it("Should be able to be deployed", async function () {
    let accounts = await ethers.getSigners()
    owner = accounts[0]
    const marketContract = await ethers.getContractFactory("NFTMarketWETH");
    const market = await marketContract.deploy();
    await market.deployed();
    console.log("NFT Market deployed to:", market.address);
    const provider = new ethers.providers.JsonRpcProvider(customURL);
    await hre.network.provider.request({ method: "hardhat_impersonateAccount", params: [NFT_OWNER] });
    const signer = hre.ethers.provider.getSigner(NFT_OWNER);
    const WETHContract = await ethers.getContractAt("IWETH", WETH)
    const WETHERC20 = await ethers.getContractAt("IERC20", WETH)
    await WETHContract.connect(owner).deposit({
      value: "1000000000000000000000"})
    const weth_balance_buyer_before_trade = await WETHERC20.balanceOf(owner.address);
    const weth_balance_seller_before_trade = await WETHERC20.balanceOf(NFT_OWNER);
    await network.provider.send("hardhat_setBalance", [NFT_OWNER, "0x21E188F84C0CE05AE5C",]);
    console.log("WETH Balance of buyer before the trade ",weth_balance_buyer_before_trade.toString());
    console.log("WETH Balance of seller before the trade",weth_balance_seller_before_trade.toString());
    const ENSContract = await ethers.getContractAt("IERC721", ENS_CONTRACT);
    let owner_of_nft = await ENSContract.ownerOf(ENS_NFT_TOKEN_ID);
    await ENSContract.connect(signer).approve(market.address,ENS_NFT_TOKEN_ID);
    await market.connect(signer).createMarketItem(ENS_CONTRACT,ENS_NFT_TOKEN_ID,"1000000000000000000000");
    await WETHERC20.connect(owner).approve(market.address,"1000000000000000000000");
    await market.connect(owner).bidMarketItem(1,"1000000000000000000000","1000000000000000000000");
    await market.connect(signer).acceptBidByApproving(ENS_CONTRACT,1,1);
    const weth_balance_buyer_after_trade = await WETHERC20.balanceOf(owner.address);
    const weth_balance_seller_after_trade = await WETHERC20.balanceOf(NFT_OWNER);
    console.log("WETH Balance of buyer after the trade ",weth_balance_buyer_after_trade.toString());
    console.log("WETH Balance of seller after the trade",weth_balance_seller_after_trade.toString());
  });

});
