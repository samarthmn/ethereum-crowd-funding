import Head from "next/head";
import Layout from "./../components/layout";
import campaignCreator from "../ethereum/web3/campaignCreator";

function Home({ campaigns }) {
  console.log(campaigns);
  return (
    <Layout>
      <Head>
        <title>Fund Labs</title>
        <meta name="description" content="Future of crowd funding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Layout>
  );
}

Home.getInitialProps = async () => {
  return { campaigns: [] };
};

export default Home;
