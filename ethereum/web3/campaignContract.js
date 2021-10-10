import { web3 } from "./connectors";
import CampaignJson from "../build/Campaign.json";

const campaignContract = (contractAddress) =>
  new web3.eth.Contract(CampaignJson.abi, contractAddress);

export default campaignContract;
