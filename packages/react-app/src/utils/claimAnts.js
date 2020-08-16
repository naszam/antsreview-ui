const claimFaucet = async (antsFaucetInstance, account) => {
  console.log(antsFaucetInstance, account);
  return antsFaucetInstance.methods.withdraw().send({ from: account });
};

export default claimFaucet;
