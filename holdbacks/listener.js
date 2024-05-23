import createMongoClient from "./createMongoClient";

/**
 * This function listens in real time all transactions
 * within the Lost Miners collection an updates a MongoDB dataset
 * @param {string} evmEndpoint example: https://mainnet.infura.io/v3/<<personal_key>>
 * @param {string} mongoEndpoint example: mongodb+srv://<user>:<password>@<user>.ekui24q.mongodb.net/?retryWrites=true&w=majority&appName=<ClusterName>
 */
const listen = async (
  evmEndpoint,
  mongoEndpoint,
  mongoDbName,
  mongoCollectionName
) => {
  const mongoClient = createMongoClient(mongoEndpoint);
};

const { EVM_ENDPOINT, MONGO_ENDPOINT, MONGO_DB_NAME, MONGO_COLLECTION } =
  process.env;

listen(EVM_ENDPOINT, MONGO_ENDPOINT, MONGO_DB_NAME, MONGO_COLLECTION);
