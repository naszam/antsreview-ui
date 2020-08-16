import React, { useEffect, useContext } from "react";
// import { Contract } from "@ethersproject/contracts";
// import { getDefaultProvider } from "@ethersproject/providers";
import { addresses, abis } from "@project/contracts";
import "./App.scss";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import getWeb3 from "./utils/getWeb3";
import { ActionContext } from "./hooks";
import Home from "./components/Home";
import { Flex } from "rimble-ui";
import { useLocation } from "react-router-dom";

function App() {
  const { addWeb3Config, selectMenu, setNetworkId, setAccount } = useContext(
    ActionContext
  );
  const location = useLocation();

  useEffect(() => {
    selectMenu(location.pathname.substr(1));
    initWeb3();
    checkEthereumChange();
  }, []);

  const checkEthereumChange = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log(accounts);
        setAccount(accounts[0]);
        // window.location.reload();
      });

      window.ethereum.on("networkChanged", async (changedChainId) => {
        console.log(changedChainId);
        setNetworkId(Number.parseInt(changedChainId));
        // window.location.reload();
      });
    }
  };

  const initWeb3 = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      const antsReviewDeployedNetwork = abis.antsreview.networks[networkId];
      const antsReviewInstance = new web3.eth.Contract(
        abis.antsreview.abi,
        antsReviewDeployedNetwork && antsReviewDeployedNetwork.address
      );
      const antsFaucetDeployedNetwork = abis.antsfaucet.networks[networkId];
      console.log(antsFaucetDeployedNetwork, antsReviewDeployedNetwork);
      const antsFaucetInstance = new web3.eth.Contract(
        abis.antsfaucet.abi,
        antsFaucetDeployedNetwork && antsFaucetDeployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      addWeb3Config({
        networkId: networkId,
        web3,
        accounts: accounts[0],
        antsReviewInstance,
        antsFaucetInstance,
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  return (
    <div className="App">
      <Header />
      <Flex>
        <Sidebar />
        <Home />
      </Flex>
    </div>
  );
}

export default App;
