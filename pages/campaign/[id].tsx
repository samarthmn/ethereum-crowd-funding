import { NextPage } from "next";
import HtmlHead from "../../components/HtmlHead";
import campaignContract from "../../ethereum/web3/campaignContract";
import CampaignDetails from "../../features/CampaignDetails";

const ViewCampaign: NextPage<Campaign> = (campaign) => {
  return (
    <>
      <HtmlHead title={campaign?.title} description={campaign?.description} />
      <CampaignDetails campaign={campaign} />
    </>
  );
};

ViewCampaign.getInitialProps = async ({ query }) => {
  const id = query.id as string;
  const campaign = (await campaignContract(id)
    .methods.getCampaignDetails()
    .call()) as string[];
  return {
    id: id,
    title: campaign[0],
    description: campaign[1],
    totalContribution: campaign[2],
    balanceAmount: campaign[3],
    minimumContribution: campaign[4],
    contributorsCount: campaign[5],
    spendingRequestCount: campaign[6],
  };
};

export default ViewCampaign;
