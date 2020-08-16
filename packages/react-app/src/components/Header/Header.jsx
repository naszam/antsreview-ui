import React, { useContext } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import NetworkIndicator from "@rimble/network-indicator";
import { EthAddress, Flex, Box } from "rimble-ui";
import { StateContext } from "../../hooks";

function Header() {
  const { networkId, accounts } = useContext(StateContext);
  console.log(networkId);

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
        <Box width={1}>
          <EthAddress address={accounts} />
        </Box>
      </Flex>
    </div>
  );
}

export default Header;
