import web3 from ".";
import Campaign from "./../../ethereum/build/Campaign.json";

const campaignContract = (ethAddress) => {
  new web3.eth.Contract(Campaign.abi, ethAddress);
};

export default campaignContract;
