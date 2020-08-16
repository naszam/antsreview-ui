import React, { useState, useEffect, useContext } from "react";
import "./FulfillAntReview.scss";
import { Input, Box, Field, Button, Form, Flex, Loader } from "rimble-ui";
import { StateContext, ActionContext } from "../../hooks";
import { etherscanBaseUrl } from "../../config";
import uploadIpfs from "../../utils/uploadIpfs";
import fulfillAntReview from "../../utils/fulfillAntReview";

function FulfillAntReview() {
  const { toggleModal, selectMenu } = useContext(ActionContext);
  const { accounts, antsReviewInstance, fulfillBountyId } = useContext(
    StateContext
  );

  const [issueLoader, setIssueLoader] = useState(false);
  const [validated, setValidated] = useState(false);
  const [fulfillFile, setFulfillFile] = useState();

  const handleFulfillFile = (e) => {
    setFulfillFile(e.target.files[0]);
    validateInput(e);
  };

  const handleSubmit = async (e) => {
    console.log("Enter");
    e.preventDefault();
    if (fulfillBountyId !== -1) {
      setIssueLoader(true);
      try {
        const fulfillIpfsResult = await uploadIpfs(fulfillFile);
        const fulfillHash = fulfillIpfsResult.cid.toString();
        const result = await fulfillAntReview(
          antsReviewInstance,
          accounts,
          fulfillBountyId,
          fulfillHash
        );
        setIssueLoader(false);
        window.toastProvider.addMessage("Fulfilling Review Success...", {
          secondaryMessage: "Check transaction on Etherscan",
          actionHref: `${etherscanBaseUrl}/tx/${result.transactionHash}`,
          actionText: "Check",
          variant: "success",
        });
        toggleModal({ openModal: false, modalConfig: {} });
        selectMenu("explorer");
      } catch (err) {
        setIssueLoader(false);
        window.toastProvider.addMessage("Fulfilling Failed...", {
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
    if (fulfillFile) {
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
          <Field label="Select review file" validated={validated} width={1}>
            <Input
              type="file"
              required // set required attribute to use brower's HTML5 input validation
              width={1}
              onChange={handleFulfillFile}
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
              {issueLoader ? <Loader color="white" /> : "Fulfill"}
            </Button>
          </Flex>
        </Box>
      </Form>
    </div>
  );
}

export default FulfillAntReview;
