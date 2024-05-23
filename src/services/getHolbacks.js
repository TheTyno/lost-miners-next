const createMongoClient = require("../../holdbacks/createMongoClient");

const getHolbacks = async () => {
  try {
    const { MONGO_ENDPOINT, MONGO_DB_NAME, MONGO_COLLECTION } = process.env;

    const mongoClient = await createMongoClient(MONGO_ENDPOINT);
    const mongoDb = await mongoClient.db(MONGO_DB_NAME);
    const collection = await mongoDb.collection(MONGO_COLLECTION);

    const miners = await collection.find({}).toArray();
    return miners;
  } catch (error) {
    console.error("Failed trying to get miners");
    return false;
  }
};

export default getHolbacks;
