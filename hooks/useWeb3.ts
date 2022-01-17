import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { walletInjected } from "../ethereum/web3/connectors";

const getConnectedAccount = async () => {
  try {
    let web3;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    }
    const connectedAccount = await web3.eth.getAccounts();
    if (connectedAccount.length) {
      return connectedAccount[0];
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

function useWeb3() {
  const { activate, deactivate } = useWeb3React();

  const init = async () => {
    try {
      const isConnected = await getConnectedAccount();
      if (isConnected) {
        activate(walletInjected);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connect = async () => await activate(walletInjected);

  const disconnect = async () => {
    let web3;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    }
    deactivate();
    web3.eth.currentProvider.disconnect();
  };

  return {
    init,
    connect,
    disconnect,
  };
}

export default useWeb3;
