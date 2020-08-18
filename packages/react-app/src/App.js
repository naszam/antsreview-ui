import React, { useEffect, useContext } from "react";
// import { Contract } from "@ethersproject/contracts";
// import { getDefaultProvider } from "@ethersproject/providers";
import "./App.scss";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ActionContext } from "./hooks";
import Home from "./components/Home";
import { Flex, ToastMessage } from "rimble-ui";
import { useLocation } from "react-router-dom";
import ModalComponent from "./components/Modal";

function App() {
  const { selectMenu, setNetworkId, setAccount } = useContext(ActionContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      selectMenu("explorer");
      console.log(location.pathname);
    } else {
      selectMenu(location.pathname.substr(1));
    }
    checkEthereumChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div className="App">
      <Header />
      <ToastMessage.Provider ref={(node) => (window.toastProvider = node)} />
      <ModalComponent />
      <Flex>
        <Sidebar />
        <Home />
      </Flex>
    </div>
  );
}

export default App;
