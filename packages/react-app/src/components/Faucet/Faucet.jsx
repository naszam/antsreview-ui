import React, { useContext, useState, useEffect } from "react";
import "./Faucet.scss";
import { StateContext } from "../../hooks";
import { Card, Input, Heading, Text, Button, Loader } from "rimble-ui";
import claimFaucet from "../../utils/claimAnts";

function Faucet() {
  const { accounts, antsFaucetInstance } = useContext(StateContext);
  const [claimloader, setClaimLoader] = useState(false);
  const [claimAddress, setClaimAddress] = useState(accounts);
  const claimFaucetAmount = async () => {
    try {
      setClaimLoader(true);
      const result = await claimFaucet(antsFaucetInstance, claimAddress);
      setClaimLoader(false);
      console.log(result);
    } catch (err) {
      console.log(err);
      setClaimLoader(false);
    }
  };

  useEffect(() => {
    if (accounts) {
      setClaimAddress(accounts);
    }
  }, [accounts]);

  return (
    <div className="Faucet">
      <Card className="faucet-card">
        <img
          src={require("../../assets/AntsReview.png")}
          alt="ant-review"
          className="ant-review-icon"
        />
        <Heading as={"h2"}>Ant Review Faucet</Heading>
        <Text.p className="ant-review-desc">
          Claim your 10 ANTS token to your wallet
        </Text.p>
        <Input
          type="text"
          className="faucet-wallet-address"
          required={true}
          placeholder="e.g. 0xAc03BB73b6a9e108530AFf4Df5077c2B3D481e5A"
          value={claimAddress}
          onChange={(e) => setClaimAddress(e.target.value)}
        />
        <Button onClick={claimFaucetAmount} className="claim-button">
          {claimloader ? <Loader color="white" /> : "Claim"}
        </Button>
      </Card>
    </div>
  );
}

export default Faucet;
