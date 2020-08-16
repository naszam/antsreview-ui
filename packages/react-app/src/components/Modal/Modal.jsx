import React, { useContext } from "react";
import "./Modal.scss";
import { StateContext, ActionContext } from "../../hooks";
import { Card, Heading, Modal, Button, Box } from "rimble-ui";
import IssueAntReview from "../IssueAntReview";
import ContributeAnt from "../ContributeAnt";
import FulfillAntReview from "../FulfillAntReview";

function ModalComponent() {
  const { toggleModal } = useContext(ActionContext);
  const { openModal, modalConfig } = useContext(StateContext);

  return (
    <Modal isOpen={openModal}>
      <Card width={"600px"} p={0}>
        <Button.Text
          icononly
          icon={"Close"}
          color={"moon-gray"}
          position={"absolute"}
          top={0}
          right={0}
          mt={2}
          mr={3}
          onClick={(e) => toggleModal({ openModal: false, modalConfig: {} })}
        />

        <Box py={3} px={4} mb={3}>
          <Heading.h3>
            {modalConfig.type === "issue-ant-review" && "Issue Ant Review"}
            {modalConfig.type === "contribute" && "Contribute to Bounty"}
            {modalConfig.type === "fulfill" && "Fulfill Bounty"}
          </Heading.h3>
        </Box>
        <Box px={4} mb={4}>
          {modalConfig.type === "issue-ant-review" && <IssueAntReview />}
          {modalConfig.type === "contribute" && <ContributeAnt />}
          {modalConfig.type === "fulfill" && <FulfillAntReview />}
        </Box>
      </Card>
    </Modal>
  );
}

export default ModalComponent;
