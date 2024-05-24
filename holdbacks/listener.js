const Web3 = require("web3");
const createMongoClient = require("./createMongoClient");
const lostMinersABI = require("./lostMinersABI.json");
const bpxWallets = require("./bpxWallets.json");

const updateMongo = async (miner, strategy) => {
  const { MONGO_ENDPOINT, MONGO_DB_NAME, MONGO_COLLECTION } = process.env;
  let mongoClient;

  try {
    mongoClient = await createMongoClient(MONGO_ENDPOINT);

    const mongoDb = await mongoClient.db(MONGO_DB_NAME);
    const collection = await mongoDb.collection(MONGO_COLLECTION);
    console.log(`Collection instance generated successfully`);
    if (strategy === "add") {
      const found = await collection.findOne({ id: miner.id });
      if (found) {
        console.log(`Miner ${miner.id} already exists on MongoDB`);
        return true;
      }
      return await collection.insertOne(miner);
    } else if (strategy === "remove") {
      return await collection.deleteOne({ id: miner.id });
    }
  } catch (error) {
    console.log(`Could not update MongoDB: ${error}`);
  } finally {
    if (mongoClient) {
      try {
        await mongoClient.close();
      } catch (error) {
        console.log(`Error closing MongoDB client: ${error}`);
      }
    }
  }
};

const listener = async () => {
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.EVM_ENDPOINT)
  );

  const contractAddress = "0x3bcacb18f4d60c8cba68cd95860daf3e32bebcb6"; // Lost Miners of the Ether contract address
  const contract = new web3.eth.Contract(lostMinersABI, contractAddress);

  console.log("Listening for NFT transfers");

  contract.events
    .Transfer({
      fromBlock: "latest",
    })
    .on("data", (event) => {
      const { from, to, tokenId } = event.returnValues;
      console.log(
        `NFT Transfer detected: Token ID ${tokenId} from ${from} to ${to}`
      );

      const minerMetadata = fetch(
        `https://ipfs.io/ipfs/QmNQpTps8TerUmnYihFFePHYGLSaVtw9uEmxvcm3MFxukZ/${tokenId}`
      );

      // If Miner was sent from a BPX wallet to a non bpx owned wallet. Remove it
      if (bpxWallets.includes(from) && !bpxWallets.includes(to)) {
        const tx = updateMongo(minerMetadata, "remove");
        console.log(tx);
      }
      // If Miner was sent to a BPX wallet, add it to MongoDB
      else if (bpxWallets.includes(to) && !bpxWallets.includes(from)) {
        const tx = updateMongo(minerMetadata, "add");
        console.log(tx);
      }
    })
    .on("error", console.error);
};

listener();
