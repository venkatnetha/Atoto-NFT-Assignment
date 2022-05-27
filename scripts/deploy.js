const hre = require('hardhat');

async function main() { 

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());


  const NFT = await hre.ethers.getContractFactory('AtotoNFT');

  console.log("After contract factory");

  const nft = await NFT.deploy("https://bafybeiadu5q6knshdzqwxxyj7htzzeqvkydofyi4tinqo2f4s4tpelatvm.ipfs.nftstorage.link/");

  console.log("After deploy")

  const txHash = nft.deployTransaction.hash;

  console.log(txHash)

  const txReceipt = await ethers.provider.waitForTransaction(txHash);

  console.log("txReceipt")

  const nftcontract =  await nft.deployed();

  // nft contract address
  console.log('contract address at:', nftcontract.address);  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });