import 'dotenv/config';
import { ethers } from 'ethers';
import chalk from 'chalk';


import artifact from "../artifacts/contracts/Atoto.sol/AtotoNFT.json" assert {type: "json"};


//Contract details

const network = "rinkeby";


//Instantiations
const provider = new ethers.providers.InfuraProvider(network, {
  projectId: process.env.projectId,
  projectSecret: process.env.projectSecret
});


const wallet = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.nftAddress, artifact.abi, wallet);

//Transfer a token from wallet holder (account1) to account2
async function mintAtotoNFT (name) {
  
  //Token details
  let tokenName = name;

  //mint nft token
  let transaction = await contract.mintNFT(tokenName);
  let result = await transaction.wait();

  //You can now add the contract address to the .env file (ftAddress)
  console.log(chalk.green(`Success! Visit etherscan for details:`));
    
  //You can inspect the transaction on Etherscan
  console.log(chalk.magenta(`https://rinkeby.etherscan.io/tx/${result.transactionHash}`));

  //You can inspect the token transfer activity on Etherscan
  console.log(chalk.blue(`https://rinkeby.etherscan.io/token/${contract.address}`));
  
  return result;
};

export default mintAtotoNFT;