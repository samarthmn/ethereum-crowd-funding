import Head from "next/head";
import { Button } from "antd";
import campaignCreatorContract from "../web3/CampaignCreatorContract";
import Layout from "./../components/layout";
import web3 from "../web3";

function Home({ campaigns }) {
  console.log(campaigns);
  return (
    <Layout>
      <Head>
        <title>Fund Labs</title>
        <meta name="description" content="Future of crowd funding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
    </Layout>
  );
}

Home.getInitialProps = async () => {
  try {
    const result = await campaignCreatorContract()
      .methods.getAllCampaigns()
      .call();
    return { campaigns: result };
  } catch (error) {
    return { campaigns: [], error };
  }
};

export default Home;
