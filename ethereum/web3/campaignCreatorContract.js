import { web3 } from "./connectors";
import CampaignCreatorJson from "../build/CampaignCreator.json";

const campaignCreatorContract = new web3.eth.Contract(
  CampaignCreatorJson.abi,
  process.env.DEPLOYED_CREATOR_CONTRACT
);

export default campaignCreatorContract;
