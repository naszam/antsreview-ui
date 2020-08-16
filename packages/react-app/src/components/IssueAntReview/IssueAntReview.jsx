import React, { useState, useEffect, useContext } from "react";
import "./IssueAntReview.scss";
import {
  Input,
  Box,
  Field,
  Button,
  Form,
  Heading,
  Flex,
  Loader,
} from "rimble-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { StateContext, ActionContext } from "../../hooks";
import uploadIpfs from "../../utils/uploadIpfs";
import issueAntReview from "../../utils/issueAntReview";
import { etherscanBaseUrl } from "../../config";

function IssueAntReview() {
  const { toggleModal, selectMenu } = useContext(ActionContext);
  const { accounts, antsReviewInstance } = useContext(StateContext);

  const [issueLoader, setIssueLoader] = useState(false);
  const [validated, setValidated] = useState(false);
  const [paperFile, setPaperFile] = useState();
  const [requirementFile, setRequirementFile] = useState();
  const [approver, setApprover] = useState("");
  const [deadline, setDeadline] = useState(0);
  const [issuers, setIssuers] = useState([accounts]);

  const handlePaperFile = (e) => {
    setPaperFile(e.target.files[0]);
    validateInput(e);
  };

  const handleRequirementFile = (e) => {
    setRequirementFile(e.target.files[0]);
    validateInput(e);
  };

  const handleApprover = (e) => {
    setApprover(e.target.value);
    validateInput(e);
  };

  const addIssuers = () => {
    setIssuers([...issuers, ""]);
    console.log(issuers);
  };

  const removeIssuers = (index) => {
    setIssuers((issuers) => issuers.filter((issuer, i) => i !== index));
  };

  const handleIssuers = (e, index) => {
    setIssuers((issuers) => {
      return issuers.map((issuer, i) =>
        i === index ? e.target.value : issuer
      );
    });
  };

  const handleDeadline = (e) => {
    setDeadline(new Date(e.target.value).getTime());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIssueLoader(true);
    try {
      const paperIpfsResult = await uploadIpfs(paperFile);
      const paperHash = paperIpfsResult.cid.toString();
      const requirementIpfsResult = await uploadIpfs(requirementFile);
      const requirementHash = requirementIpfsResult.cid.toString();
      const result = await issueAntReview(
        antsReviewInstance,
        accounts,
        paperHash,
        requirementHash,
        approver,
        issuers,
        deadline.toString()
      );
      console.log(result);
      setIssueLoader(false);
      window.toastProvider.addMessage("Issued Bounty...", {
        secondaryMessage: "Check transaction on Etherscan",
        actionHref: `${etherscanBaseUrl}/tx/${result.transactionHash}`,
        actionText: "Check",
        variant: "success",
      });
      toggleModal({ openModal: false, modalConfig: {} });
      selectMenu("explorer");
    } catch (err) {
      setIssueLoader(false);
      window.toastProvider.addMessage("Issuing Bounty Failed...", {
        secondaryMessage: err.message,
        actionHref: "#!",
        variant: "failure",
      });
      console.log(err);
    }
  };

  const validateInput = (e) => {
    e.target.parentNode.classList.add("was-validated");
  };

  const validateForm = () => {
    // Perform advanced validation here
    if (
      paperFile &&
      requirementFile &&
      approver.length > 0 &&
      checkEmptyIssuer(issuers) &&
      deadline
    ) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  const checkEmptyIssuer = (issuers) => {
    return issuers.filter((issuer) => !issuer).length === 0;
  };

  useEffect(() => {
    validateForm();
  });

  return (
    <div className="IssueAntReview">
      <Form onSubmit={handleSubmit} validated={true}>
        <Box width={[1, 1, 1]}>
          <Field label="Select paper" validated={validated} width={1}>
            <Input
              type="file"
              required // set required attribute to use brower's HTML5 input validation
              width={1}
              onChange={handlePaperFile}
            />
          </Field>
        </Box>
        <Box width={[1, 1, 1]}>
          <Field label="Select requirement" validated={validated} width={1}>
            <Input
              type="file"
              required // set required attribute to use brower's HTML5 input validation
              width={1}
              onChange={handleRequirementFile}
            />
          </Field>
        </Box>
        <Box width={[1, 1, 1]}>
          <Field label="Enter approver" validated={validated} width={1}>
            <Input
              type="text"
              required // set required attribute to use brower's HTML5 input validation
              width={1}
              placeholder="e.g. 0xb7BdB23Bf4B3g567f4da57e2s86Bc7f4D3b4F5B2"
              value={approver}
              onChange={handleApprover}
            />
          </Field>
        </Box>
        <Box width={[1, 1, 1]} mb={3}>
          <Flex justifyContent="space-between" alignItems="center" mb={2}>
            <Heading.h6 m={0}>Add Issuers</Heading.h6>
            <Button type="button" icon="Add" size="small" onClick={addIssuers}>
              Add Issuer
            </Button>
          </Flex>
          {issuers.map((issuer, i) => (
            <Flex alignItems="center" key={i} mb={2}>
              <Input
                type="text"
                width={1}
                required={true}
                placeholder="e.g. 0xb7BdB23Bf4B3g567f4da57e2s86Bc7f4D3b4F5B2"
                value={issuer}
                onChange={(e) => handleIssuers(e, i)}
                mr={3}
              />
              <div
                className="remove-issue-button"
                onClick={(e) => removeIssuers(i)}
              >
                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
              </div>
            </Flex>
          ))}
        </Box>
        <Box width={[1, 1, 1]}>
          <Field label="Deadline" validated={validated} width={1}>
            <Input
              type="date"
              required // set required attribute to use brower's HTML5 input validation
              onChange={handleDeadline}
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
              {issueLoader ? <Loader color="white" /> : "Issue Ant Review"}
            </Button>
          </Flex>
        </Box>
      </Form>
    </div>
  );
}

export default IssueAntReview;
