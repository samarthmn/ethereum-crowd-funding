import Web3 from "web3";
import { getWeb3ReactContext } from "@web3-react/core";

function campaignCreator() {
  const web3ReactContext = getWeb3ReactContext();
  console.log(web3ReactContext);
}

export default campaignCreator;
