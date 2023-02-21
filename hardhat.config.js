require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const privateKeys = process.env.PRIVATE_KEYS || "";
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  solidity: "0.8.17",
  networks: {
    localhost: {},
    goerli: {
      url: `https://wider-flashy-uranium.ethereum-goerli.discover.quiknode.pro/${process.env.API_KEY}`,
      accounts: privateKeys.split(","),
    },
  },
};
