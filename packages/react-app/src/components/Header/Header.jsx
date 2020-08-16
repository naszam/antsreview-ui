import React, { useContext } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import NetworkIndicator from "@rimble/network-indicator";
import { EthAddress, Flex } from "rimble-ui";
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
      <Flex>
        <NetworkIndicator currentNetwork={networkId} requiredNetwork={42} />
        <EthAddress address={accounts} />
      </Flex>
    </div>
  );
}

export default Header;
