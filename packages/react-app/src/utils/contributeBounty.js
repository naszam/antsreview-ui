import { addresses } from "@project/contracts";
const contributeBounty = async (
  antsReviewInstance,
  antsInstance,
  account,
  bountyId,
  amount
) => {
  console.log(antsReviewInstance, account, bountyId, amount);
  await antsInstance.methods
    .approve(addresses.antsreview, amount)
    .send({ from: account });
  return antsReviewInstance.methods
    .contribute(bountyId, amount)
    .send({ from: account });
};

export default contributeBounty;