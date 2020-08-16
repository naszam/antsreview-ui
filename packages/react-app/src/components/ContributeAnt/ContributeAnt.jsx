import React, { useState, useEffect, useContext } from "react";
import "./ContributeAnt.scss";
import { Input, Box, Field, Button, Form, Flex, Loader } from "rimble-ui";
import { StateContext, ActionContext } from "../../hooks";
import { etherscanBaseUrl } from "../../config";
import contributeBounty from "../../utils/contributeBounty";

function ContributeAnt() {
  const { toggleModal, selectMenu } = useContext(ActionContext);
  const {
    web3,
    accounts,
    antsReviewInstance,
    antsInstance,
    contributeBountyId,
  } = useContext(StateContext);

  const [issueLoader, setIssueLoader] = useState(false);
  const [validated, setValidated] = useState(false);
  const [contributeAmount, setContributeAmount] = useState("");

  const handleContributeAmount = (e) => {
    setContributeAmount(e.target.value);
    validateInput(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contributeBountyId !== -1) {
      setIssueLoader(true);
      try {
        const result = await contributeBounty(
          web3,
          antsReviewInstance,
          antsInstance,
          accounts,
          contributeBountyId,
          contributeAmount
        );
        setIssueLoader(false);
        window.toastProvider.addMessage("Contributed contributeAmount ANT...", {
          secondaryMessage: "Check transaction on Etherscan",
          actionHref: `${etherscanBaseUrl}/tx/${result.transactionHash}`,
          actionText: "Check",
          variant: "success",
        });
        toggleModal({ openModal: false, modalConfig: {} });
        selectMenu("explorer");
      } catch (err) {
        setIssueLoader(false);
        window.toastProvider.addMessage("Contribution Failed...", {
          secondaryMessage: err.message,
          actionHref: "#!",
          variant: "failure",
        });
        console.log(err);
      }
    }
  };

  const validateInput = (e) => {
    e.target.parentNode.classList.add("was-validated");
  };

  const validateForm = () => {
    // Perform advanced validation here
    if (contributeAmount && Number.parseInt(contributeAmount)) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  useEffect(() => {
    validateForm();
  });

  return (
    <div className="IssueAntReview">
      <Form onSubmit={handleSubmit} validated={true}>
        <Box width={[1, 1, 1]}>
          <Field label="Enter amount" validated={validated} width={1}>
            <Input
              type="number"
              required // set required attribute to use brower's HTML5 input validation
              width={1}
              placeholder="e.g. 10 ANT"
              value={contributeAmount}
              onChange={handleContributeAmount}
            />
          </Field>
        </Box>
        <Box mt={4}>
          <Flex justifyContent="center">
            {/* Use the validated state to update UI */}
            <Button
              type="submit"
              disabled={!validated}
              className="submit-button"
            >
              {issueLoader ? <Loader color="white" /> : "Contribute"}
            </Button>
          </Flex>
        </Box>
      </Form>
    </div>
  );
}

export default ContributeAnt;
