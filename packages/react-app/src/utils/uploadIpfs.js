import ipfsClient from "ipfs-http-client";

const uploadIpfs = async (file) => {
  const ipfs = ipfsClient({
    host: "ipfs.infura.io",
    port: "5001",
    protocol: "https",
  });

  const fileDetails = {
    path: `/antreviews/${file.name}`,
    content: file,
  };

  const options = {
    wrapWithDirectory: true,
    progress: (prog) => console.log(`received: ${prog}`),
  };

  return ipfs.add(fileDetails, options);
};

export default uploadIpfs;
