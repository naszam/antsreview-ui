const fulfillAntReview = async (
  antsReviewInstance,
  account,
  bountyId,
  reviewHash
) => {
  console.log(antsReviewInstance, account, bountyId, reviewHash);
  return antsReviewInstance.methods
    .fulfillAntReview(bountyId, reviewHash)
    .send({ from: account });
};

export default fulfillAntReview;
