import web3 from ".";
import CampaignCreator from "./../../ethereum/build/CampaignCreator.json";

const campaignCreatorContract = () =>
  new web3.eth.Contract(CampaignCreator.abi, process.env.DEPLOYED_CONTRACT);

export default campaignCreatorContract;
