import { InjectedConnector } from "@web3-react/injected-connector";
import Web3 from "web3";

const provider = new Web3.providers.HttpProvider(process.env.INFURA_LINK);

export const web3 = new Web3(provider);

export const walletInjected = new InjectedConnector({
  supportedChainIds: [4],
});
