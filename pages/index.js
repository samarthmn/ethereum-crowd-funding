import Head from "next/head";
import { Button } from "antd";
import Layout from "./../components/layout";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "../ethereum/connector";
import campaignCreator from "../ethereum/web3/campaignCreator";

// TODO: integrate web3 using web3-react

function Home({ campaigns }) {
  console.log(campaigns);
  campaignCreator();
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
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
  // try {
  //   const result = await campaignCreatorContract()
  //     .methods.getAllCampaigns()
  //     .call();
  //   return { campaigns: result };
  // } catch (error) {
  //   return { campaigns: [], error };
  // }
  return { campaigns: [] };
};

export default Home;
