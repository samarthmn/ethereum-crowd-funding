import { useWeb3React } from "@web3-react/core";
import Layout from "./../../components/Layout";
import HtmlHead from "../../components/HtmlHead";
import campaignContract from "../../ethereum/web3/campaignContract";

function CampaignDetails({ campaign }) {
  console.log(campaign);
  const { active, library } = useWeb3React();
  console.log(active, library);
  return (
    <Layout>
      <HtmlHead />
    </Layout>
  );
}

CampaignDetails.getInitialProps = async ({ query }) => {
  const campaign = await campaignContract(query.id)
    .methods.getCampaignDetails()
    .call();
  console.log(query.id);
  return { campaign };
};

export default CampaignDetails;
