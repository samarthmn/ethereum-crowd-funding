import { web3 } from "./connectors";
const CampaignJson = require("../build/Campaign.json");

const campaignContract = (contractAddress: string) =>
  new web3.eth.Contract(CampaignJson.abi, contractAddress);

export default campaignContract;
