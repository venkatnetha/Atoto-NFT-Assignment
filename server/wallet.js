//Generate new Ethereum account
import { ethers } from 'ethers';
import * as fs from 'fs';
import * as os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const envFilePath = path.resolve(__dirname, ".env");

// read .env file & convert to array
const readEnvVars = () => fs.readFileSync(envFilePath, "utf-8").split(os.EOL);


const rawAccount1 = ethers.Wallet.createRandom();
const account1 = {address: rawAccount1.address, privateKey: rawAccount1.privateKey};
console.log(account1);

const rawAccount2 = ethers.Wallet.createRandom();
const account2 = {address: rawAccount2.address, privateKey: rawAccount2.privateKey};
console.log(account2);


/**
 * Updates value for existing key or creates a new key=value line
 *
 * 
 *
 * @param {string} key Key to update/insert
 * @param {string} value Value to update/insert
 */
 const setEnvValue = (key, value) => {
    const envVars = readEnvVars();
    const targetLine = envVars.find((line) => line.split("=")[0] === key);
    if (targetLine !== undefined) {
      // update existing line
      const targetLineIndex = envVars.indexOf(targetLine);
      // replace the key/value with the new value
      envVars.splice(targetLineIndex, 1, `${key}="${value}"`);
    } else {
      // create new key value
      envVars.push(`${key}="${value}"`);
    }
    // write everything back to the file system
    fs.writeFileSync(envFilePath, envVars.join(os.EOL));
};

// examples

setEnvValue('walletaddress1', account1.address)
setEnvValue('wallet1privatekey', account1.privateKey)

setEnvValue('walletaddress2', account2.address)
setEnvValue('wallet2privatekey', account2.privateKey)

