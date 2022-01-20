require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./build/CampaignCreator.json");

console.log(process.env.WALLET_KEY_PHRASE);

const provider = new HDWalletProvider(
  process.env.WALLET_KEY_PHRASE,
  process.env.INFURA_LINK
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);
    const result = await new web3.eth.Contract(abi)
      .deploy({ data: bytecode })
      .send({ gas: "3000000", gasPrice: "5000000000", from: accounts[0] });
    console.log("Contract deployed to", result.options.address);
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
};
deploy();

export {};
