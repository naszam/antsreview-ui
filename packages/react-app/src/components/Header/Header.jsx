import React, { useContext } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import NetworkIndicator from "@rimble/network-indicator";
import { EthAddress, Flex, Box, Button } from "rimble-ui";
import { StateContext, ActionContext } from "../../hooks";
import getWeb3 from "../../utils/getWeb3";
import { addresses, abis } from "@project/contracts";

function Header() {
  const { networkId, accounts, web3, antReviewBountyArray } = useContext(
    StateContext
  );
  const { setAntReviewEventsArray, addWeb3Config } = useContext(ActionContext);

  const initWeb3 = async () => {
    try {
      console.log("Entry");
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log(web3);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // const antsReviewDeployedNetwork = abis.antsreview.networks[networkId];
      const antsReviewInstance = new web3.eth.Contract(
        abis.antsreview.abi,
        addresses.antsreview
      );
      // const antsFaucetDeployedNetwork = abis.antsfaucet.networks[networkId];
      const antsFaucetInstance = new web3.eth.Contract(
        abis.antsfaucet.abi,
        addresses.antsfaucet
      );

      const antsInstance = new web3.eth.Contract(abis.ants.abi, addresses.ants);

      antsReviewInstance.events
        .AntReviewIssued({ fromBlock: 0 })
        .on("data", async (event) => {
          antReviewBountyArray.push(event.returnValues);
          console.log(antReviewBountyArray);
          setAntReviewEventsArray(antReviewBountyArray);
        })
        .on("error", console.error);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      addWeb3Config({
        networkId: networkId,
        web3,
        accounts: accounts[0],
        antsReviewInstance,
        antsFaucetInstance,
        antsInstance,
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
    <div className="header header-with-shadow">
      <Link to="/">
        <img
          src={require("../../assets/AntsReview.png")}
          alt="ant-review"
          className="header-home-container"
        />
      </Link>
      <Flex width={1 / 2} mr={3}>
        <Flex justifyContent="flex-end" mr={4} width={1}>
          <NetworkIndicator currentNetwork={networkId} requiredNetwork={42} />
        </Flex>
        {web3 ? (
          <Box width={1}>
            <EthAddress address={accounts} />
          </Box>
        ) : (
          <Flex justifyContent="flex-end" width={1 / 3}>
            <Button onClick={initWeb3}>Connect wallet</Button>
          </Flex>
        )}
      </Flex>
    </div>
  );
}

export default Header;
