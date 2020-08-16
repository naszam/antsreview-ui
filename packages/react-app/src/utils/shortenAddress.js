const shortenAddress = (pAddress, pDigits = 4) => {
  return `${pAddress.substring(0, pDigits + 2)}...${pAddress.substring(
    pAddress.length - pDigits
  )}`;
};

export default shortenAddress;
