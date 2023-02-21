const main = async () => {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log(`Account balance: ${accountBalance.toString()}`);

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log(`Contract deployed to ${waveContract.address}`);
  console.log(`Contract deployed by ${deployer.address}`);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait(); // Wait for the transaction to be mined

  const [_, randomPerson] = await hre.ethers.getSigners();
  waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
  await waveTxn.wait(); // Wait for the transaction to be mined

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
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
