import campaignCreatorContract from "../ethereum/web3/campaignCreatorContract";
import HtmlHead from "../components/HtmlHead";
import CampaignDashboard from "../features/CampaignsDashboard";
import { NextPage } from "next";

const Home: NextPage<string[]> = (campaigns) => {
  return (
    <>
      <HtmlHead />
      <CampaignDashboard campaigns={Object.values(campaigns)} />
    </>
  );
};

Home.getInitialProps = async () => {
  const campaigns = (await campaignCreatorContract.methods
    .getAllCampaigns()
    .call()) as string[];

  return campaigns;
};

export default Home;
