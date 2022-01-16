import campaignCreatorContract from "../ethereum/web3/campaignCreatorContract";
import HtmlHead from "../components/HtmlHead";
import CampaignDashboard from "../features/CampaignsDashboard";

function Home({ campaigns }) {
  return (
    <>
      <HtmlHead />
      <CampaignDashboard campaigns={campaigns} />
    </>
  );
}

Home.getInitialProps = async () => {
  const campaigns = await campaignCreatorContract.methods
    .getAllCampaigns()
    .call();
  return { campaigns };
};

export default Home;
