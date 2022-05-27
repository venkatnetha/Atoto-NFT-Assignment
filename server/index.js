import { ethers } from 'ethers';
import * as fs from 'fs';
import * as os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import express from 'express';
import * as http from 'http'; 
import cors from "cors";
import chalk from "chalk";
import mintAtotoNFT from './mintNFT.js';
import getAllMintedNFTs from "./getAllMintedNFTs.js";
import getNFT from "./getNFT.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000

//setup app & its routes
const app = express();
app.use(cors());
const router = express.Router();
app.use(router);


app.listen(PORT, () => {
  console.log(chalk.blue(`Sever listening on port ${PORT}`));
});


app.post('/nftMint/:id', (req, res) => { 
  let Name = req.params.id;
  console.log(Name)   
  mintAtotoNFT(Name).then(result => {
    console.log(`statusCode: ${result.status}`);
    console.log(result);    
    const response = { "response" : "NFT minted with name" + "-----------"+ Name}
    res.end(JSON.stringify(response));
  })
  .catch(error => {
    console.error(error);
    console.log(response);
    const response = { "response" : "error occured while minting" + "-----------"+ error}
    res.end(JSON.stringify(response));
  });
});

app.get('/nftMint', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  getAllMintedNFTs().then(result => {
    console.log(`statusCode: ${result.status}`);
    console.log(result);
    res.end(JSON.stringify(result));
  })
  .catch(error => {
    console.error(error);
    console.log(response);
    const response = { "response" : "error occured while minting" + "-----------"+ error}
    res.end(JSON.stringify(response));
  });
})


app.get('/nftMint/:id', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  getNFT(req.params.id).then(result => {
    console.log(`statusCode: ${result.status}`);
    console.log(result);
    res.end(JSON.stringify(result));
  })
  .catch(error => {
    console.error(error);
    console.log(response);
    const response = { "response" : "error occured while minting" + "-----------"+ error}
    res.end(JSON.stringify(response));
  });
})

export default app;