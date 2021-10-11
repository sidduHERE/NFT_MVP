require("@nomiclabs/hardhat-waffle");
require("hardhat-contract-sizer")
require("hardhat-deploy")
const dotenv = require("dotenv");
dotenv.config();
const MAINNET_URL = process.env.INFURA_URL;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.2",
  namedAccounts: {
    deployer: {
      default: 0,
    }
  },
  networks: {
    hardhat: {
      gasPrice: 225000000000,
      forking: {
        url: MAINNET_URL, 
        enabled: true
      },
      accounts: {
        accountsBalance: "1000000000000000000000000000000", 
        count: 50
      }
    },
    // mainnet: {
    //   accounts: [`0x${process.env.MAINNET_PRIVATE_KEY}`],
    //    url: MAINNET_URL,
    //    chainId: 1,
    //    timeout: 2000000
    //  },
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
  }
};