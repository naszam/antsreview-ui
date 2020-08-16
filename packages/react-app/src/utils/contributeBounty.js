import { addresses } from "@project/contracts";
const contributeBounty = async (
  web3,
  antsReviewInstance,
  antsInstance,
  account,
  bountyId,
  amount
) => {
  console.log(antsReviewInstance, account, bountyId, amount);
  await antsInstance.methods
    .approve(addresses.antsreview, web3.utils.toWei(amount, "ether"))
    .send({ from: account });
  return antsReviewInstance.methods
    .contribute(bountyId, web3.utils.toWei(amount, "ether"))
    .send({ from: account });
};

export default contributeBounty;
