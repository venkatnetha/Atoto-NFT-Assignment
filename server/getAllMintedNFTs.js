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
async function getAllMintedNFTs () {
  
  //Token details
  let tokenid = await contract.MAX_SUPPLY();

  let numberoftokens = ethers.BigNumber.from(tokenid).toNumber()
  console.log(chalk.green.bold(`The Maximum supply of NFTs for this contract is ${numberoftokens}`));

  var resultsArray = []

  for (let i = 0; i < numberoftokens; i++) {
    let Result = await contract.mintedTokens(i)
    resultsArray.push(Result);
  }

  console.log(chalk.green(`Success! Visit etherscan for details:`));
  var tokenId =1
  for (let j = 0; j < resultsArray.length; j++) {
      
    console.log(chalk.magenta.bold(`The tokenURI for the minted tokenId ${tokenId} is :${resultsArray[j]}`));
    tokenId++;
  }
   
  return resultsArray;
}

export default getAllMintedNFTs;