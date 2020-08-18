import React, { useContext } from "react";
import "./Explorer.scss";
import { StateContext, ActionContext } from "../../hooks";
import {
  Card,
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Blockie,
  Button,
} from "rimble-ui";
import shortenAddress from "../../utils/shortenAddress";
import { ExternalLink } from "react-feather";

function Explorer() {
  const { antReviewBountyArray } = useContext(StateContext);
  const { toggleModal, setContributeBountyId, setFulfillBountyId } = useContext(
    ActionContext
  );
  const contribute = (bountyId) => {
    setContributeBountyId(bountyId);
    toggleModal({
      openModal: true,
      modalConfig: { type: "contribute" },
    });
  };
  const fulfill = (bountyId) => {
    setFulfillBountyId(bountyId);
    toggleModal({
      openModal: true,
      modalConfig: { type: "fulfill" },
    });
  };
  return (
    <div className="Explorer">
      <Box p={4}>
        {antReviewBountyArray.map((bounty, i) => (
          <Card width={1} p={3} mb={3} className="bounty-card" key={i}>
            <Flex>
              <Box p={1} mr={3} mt={2} className="ant-id-container">
                <Heading.h4 m={0}>{bounty.antId}</Heading.h4>
              </Box>
              <Flex p={1} width={1} justifyContent="space-between">
                <Box>
                  <Heading.h5 m={0}>Paper hash</Heading.h5>
                  <Flex mt={1} alignItems="center">
                    <Text.p m={0} mr={2} fontSize={14}>
                      {bounty.paperHash}
                    </Text.p>
                    <Link
                      href={`https://ipfs.io/ipfs/${bounty.paperHash}`}
                      target="_blank"
                      title="This link goes somewhere"
                    >
                      Click to open link to Paper in IPFS{" "}
                      <ExternalLink height={12} width={12} />
                    </Link>
                  </Flex>
                  <Heading.h5 m={0} mt={3}>
                    Requirement hash
                  </Heading.h5>
                  <Flex mt={1} alignItems="center">
                    <Text.p m={0} mr={2} fontSize={14}>
                      {bounty.requirementsHash}
                    </Text.p>
                    <Link
                      href={`https://ipfs.io/ipfs/${bounty.requirementsHash}`}
                      target="_blank"
                      title="This link goes somewhere"
                    >
                      Click to open link to Requirement in IPFS{" "}
                      <ExternalLink height={12} width={12} />
                    </Link>
                  </Flex>
                  <Heading.h5 m={0} mt={4}>
                    Issuers
                  </Heading.h5>
                  <Flex mt={2}>
                    {bounty.issuers.map((issuer) => (
                      <Flex mr={4} px={3} py={1} className="issuer-style">
                        <Blockie
                          opts={{
                            seed: issuer,
                            color: "#dfe",
                            bgcolor: "#a71",
                            size: 12,
                            scale: 2,
                            spotcolor: "#000",
                          }}
                        />
                        <Text.p
                          m={0}
                          ml={2}
                          fontSize={14}
                          className="issuer-text-style"
                        >
                          {shortenAddress(issuer)}
                        </Text.p>
                      </Flex>
                    ))}
                  </Flex>
                </Box>
                <Box p={1}>
                  <Flex mt={2}>
                    <Button
                      type="button"
                      icon="AttachMoney"
                      size="small"
                      className="action-button"
                      mr={2}
                      onClick={(e) => contribute(bounty.antId)}
                    >
                      Contribute
                    </Button>
                    <Button
                      type="button"
                      size="small"
                      className="action-button"
                      onClick={(e) => fulfill(bounty.antId)}
                    >
                      Fulfill
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default Explorer;
