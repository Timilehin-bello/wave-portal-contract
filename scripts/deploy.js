const { ethers } = require("hardhat");

const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const WavePortal = await hre.ethers.getContractFactory("WavePortal");
  const wavePortal = await WavePortal.deploy();

  await wavePortal.deployed();

  console.log(`Contract deployed to ${wavePortal.address}`);
  console.log(`Contract deployed by ${owner.address}`);

  await wavePortal.getTotalWaves();

  const waveMe = await wavePortal.wave();
  await waveMe.wait();

  await wavePortal.getTotalWaves();

  const secondWaveMe = await wavePortal.connect(randomPerson).wave();
  await secondWaveMe.wait();
};

// const runMain = async () => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };

// runMain();
main().catch((err) => {
  console.log(err);
  process.exit(1);
});
