import "@fontsource/mulish";
import "@fontsource/raleway";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { AppProps } from "next/app";
import theme from "../utils/theme";
import Layout from "../components/Layout";
import { NextPage } from "next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLibrary = (provider?: any) => {
  return new Web3(provider);
};

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Web3ReactProvider>
  );
};

export default MyApp;
