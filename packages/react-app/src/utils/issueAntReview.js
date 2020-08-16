const issueAntReview = async (
  antsReviewInstance,
  account,
  paperHash,
  requirementHash,
  approver,
  issuers,
  deadline
) => {
  console.log(
    antsReviewInstance,
    account,
    paperHash,
    requirementHash,
    approver,
    issuers,
    deadline
  );
  return antsReviewInstance.methods
    .issueAntReview(issuers, approver, paperHash, requirementHash, deadline)
    .send({ from: account });
};

export default issueAntReview;
